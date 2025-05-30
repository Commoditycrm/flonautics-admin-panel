import { gql } from "@apollo/client";

export const GET_ORGANIZATIONS = gql`
  query Organizations($options: OrganizationOptions) {
    organizations(options: $options) {
      id
      name
      createdAt
      deletedAt
      lastModified
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
    organizationsConnection {
      totalCount
    }
  }
`;
