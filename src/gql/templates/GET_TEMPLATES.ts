import { gql } from "@apollo/client";

export const GET_TEMPLATES = gql`
  query Projects(
    $where: ProjectWhere
    $options: ProjectOptions
    $projectsConnectionWhere2: ProjectWhere
  ) {
    projects(where: $where, options: $options) {
      id
      name
      description
      createdAt
      backlogItemsCount
      createdBy {
        email
        name
      }
    }
    projectsConnection(where: $projectsConnectionWhere2) {
      totalCount
    }
  }
`;
