import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
// import fetch from "cross-fetch";
import { signOut } from "firebase/auth";
import {firebaseAuth} from "./firebaseConfig";
import { getCookie, setCookie } from "./src/data/helpers/authCookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// --- Util: Clear all cookies ---
const clearAllCookies = () => {
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
  });
};

// --- HTTP Link ---
const httpLink = new HttpLink({
  uri: API_URL,
  // fetch,
});

const authLink = new ApolloLink((operation, forward) => {
  const token = getCookie("accessToken");
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }));
  return forward(operation);
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    const tokenExpired = graphQLErrors?.some(
      ({ message }) =>
        message.includes("Token expired") || message.includes("Unknown user")
    );

    if (tokenExpired) {
      return new Observable((observer) => {
        firebaseAuth.currentUser
          ?.getIdToken(true)
          .then((newToken) => {
            setCookie("accessToken", newToken, 1, "/", {
              secure: true,
              sameSite: "Strict",
            });

            operation.setContext(({ headers = {} }) => ({
              headers: {
                ...headers,
                authorization: `Bearer ${newToken}`,
              },
            }));

            forward(operation).subscribe(observer);
          })
          .catch((err) => {
            console.error("Token refresh failed:", err);
            observer.error(err);
          });
      });
    }

    const emailNotVerified = graphQLErrors?.some(({ message }) =>
      message.includes("Please verify your email first.")
    );

    if (emailNotVerified) {
      signOut(firebaseAuth)
        .then(() => {
          clearAllCookies();
          window.location.href = "/login";
        })
        .catch((err) => {
          console.error("Sign-out error:", err);
        });
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
    if (graphQLErrors && !tokenExpired && !emailNotVerified) {
      graphQLErrors.forEach(({ message, path }) => {
        console.warn(`[GraphQL error]: Message: ${message}, Path: ${path}`);
      });
    }
  }
);

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default client;
