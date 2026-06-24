import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  Observable,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "./firebaseConfig";
import { createSessionOnce } from "./lib/createSessionOnce";

// Hit our own same-origin proxy (/api/gql) instead of the backend directly, so
// the httpOnly `session` cookie is included (it's host-only to this domain) and
// forwarded server-side. credentials:"include" makes the browser send it along.
const httpLink = new HttpLink({
  uri: "/api/gql",
  credentials: "include",
});

const goToLogin = () => {
  if (typeof window !== "undefined") {
    window.location.href = "/";
  }
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors?.length) {
      const firstError = graphQLErrors[0];
      const code = firstError?.extensions?.code as string | undefined;

      // backend rejected the session (expired / logged out / unknown user)
      if (code === "UNAUTHENTICATED" || code === "ACCOUNT_DELETED") {
        const alreadyRetried = operation.getContext().sessionRetried;
        const user = firebaseAuth.currentUser;

        // try once: refresh the session from firebase, then replay the query
        if (!alreadyRetried && user && code === "UNAUTHENTICATED") {
          return new Observable((observer) => {
            createSessionOnce(user)
              .then((res) => {
                if (!res.ok) {
                  throw new Error("Session refresh failed");
                }
                operation.setContext({ sessionRetried: true });
                forward(operation).subscribe(observer);
              })
              .catch(async (err) => {
                await signOut(firebaseAuth).catch(() => {});
                goToLogin();
                observer.error(err);
              });
          });
        }

        // nothing to refresh with, or the refresh itself failed
        signOut(firebaseAuth).catch(() => {});
        goToLogin();
        return;
      }

      // email not verified, so the backend won't hand out a session
      if (code === "EMAIL_NOT_VERIFIED") {
        signOut(firebaseAuth).catch(() => {});
        goToLogin();
        return;
      }

      graphQLErrors.forEach(({ message, path }) => {
        console.warn(`[GraphQL error]: Message: ${message}, Path: ${path}`);
      });
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  },
);

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  devtools: { enabled: process.env.NODE_ENV !== "production" },
});

export default client;
