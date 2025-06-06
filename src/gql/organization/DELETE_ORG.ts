import { gql } from "@apollo/client";

export const DELETE_ORG = gql`
  mutation DeleteOrg($orgId: String) {
    deleteOrg(orgId: $orgId)
  }
`;
