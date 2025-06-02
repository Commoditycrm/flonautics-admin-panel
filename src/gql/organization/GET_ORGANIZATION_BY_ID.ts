import { gql } from "@apollo/client";

export const GET_ORGANIZATION_BY_ID = gql`
  query getOrganizationById($where: OrganizationWhere) {
    organizations(where: $where) {
      id
      name
      description
      createdAt
      deletedAt
      createdBy {
        email
        name
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
