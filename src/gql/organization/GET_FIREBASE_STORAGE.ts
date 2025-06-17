import { gql } from "@apollo/client";

export const GET_FIREBASE_STORAGE = gql`
  query GetFirebaseStorage($orgId: String!) {
    getFirebaseStorage(orgId: $orgId) {
      fileCount
      totalMB
      totalBytes
    }
  }
`;
