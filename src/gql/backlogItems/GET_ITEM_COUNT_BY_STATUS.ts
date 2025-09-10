import { gql } from "@apollo/client";

export const GET_ITEM_COUNT_BY_STATUS = gql`
  query CountBacklogItemsGroupedByStatus($projectId: ID) {
    countBacklogItemsGroupedByStatus(projectId: $projectId) {
      color
      count
      status
      id
    }
  }
`;
