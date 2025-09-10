import { gql } from "@apollo/client";

export const GET_BACKLOGITEMS_BY_PROJECT = gql`
  query getBacklogItemsByProject(
    $where: BacklogItemWhere
    $options: BacklogItemOptions
    $backlogItemsConnectionWhere2: BacklogItemWhere
  ) {
    backlogItems(where: $where, options: $options) {
      id
      label
      uid
      riskLevel {
        id
        name
        color
      }
      type {
        id
        name
      }
      status {
        id
        name
        color
      }
      assignedUser {
        id
        name
        email
      }
    }
    backlogItemsConnection(where: $backlogItemsConnectionWhere2) {
      totalCount
    }
  }
`;
