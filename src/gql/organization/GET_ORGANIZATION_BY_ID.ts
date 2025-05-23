import { gql } from "@apollo/client";

export const GET_ORGANIZATION_BY_ID = gql`
  query getOrganizationById($where: OrganizationWhere) {
    organizations(where: $where) {
      id
      name
      createdAt
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
