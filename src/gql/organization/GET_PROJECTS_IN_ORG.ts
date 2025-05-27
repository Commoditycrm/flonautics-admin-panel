import { gql } from "@apollo/client";

export const GET_PROJECTS_IN_ORGANIZATION = gql`
  query GetProjectsInOrganization(
    $where: ProjectWhere
    $options: ProjectOptions
  ) {
    projects(where: $where, options: $options) {
      id
      name
      description
      startDate
      endDate
      createdAt
      updatedAt
      createdBy {
        name
        email
      }
      assignedUsers {
        id
        name
      }
    }
    projectsAggregate(where: $where) {
      count
    }
  }
`;
