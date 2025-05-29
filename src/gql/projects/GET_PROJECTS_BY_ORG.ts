import { gql } from "@apollo/client";

export const GET_PROJECTS_BY_ORG = gql`
  query GetProjectsByOrg(
    $where: ProjectWhere
    $options: ProjectOptions
    $projectsConnectionWhere2: ProjectWhere
  ) {
    projects(where: $where, options: $options) {
      id
      name
      description
      createdAt
      createdBy {
        name
        email
      }
      assignedUsersConnection {
        totalCount
      }
    }
    projectsConnection(where: $projectsConnectionWhere2) {
      totalCount
      # pageInfo {
      #   hasPreviousPage
      #   hasNextPage
      # }
    }
  }
`;
