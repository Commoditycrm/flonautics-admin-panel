import { gql } from "@apollo/client";

export const GET_ALL_ORGANIZATIONS = gql`
 query Organizations($options: OrganizationOptions) {
  organizations(options: $options) {
    id
    name
    createdAt
    createdBy {
      name
      email
    }
    memberUsersConnection {
      totalCount
    }
    projectsConnection {
      totalCount
    }
  }
}
`;
