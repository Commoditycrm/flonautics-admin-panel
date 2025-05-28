import { gql } from "@apollo/client";

export const TOGGLE_ORG_STATUS = gql`
  mutation toggleOrgStatus(
    $where: OrganizationWhere
    $update: OrganizationUpdateInput
  ) {
    updateOrganizations(where: $where, update: $update) {
      organizations {
        id
      }
    }
  }
`;
