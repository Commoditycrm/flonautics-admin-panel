import { gql } from "@apollo/client";

export const GET_BACKLOGITEM_COUNT = gql`
  query getBacklogItemsByProject(
    $backlogItemsConnectionWhere3: BacklogItemWhere
    $backlogItemsConnectionWhere4: BacklogItemWhere
    $backlogItemsConnectionWhere5: BacklogItemWhere
    $backlogItemsConnectionWhere6: BacklogItemWhere
  ) {
    notStartedItemCount: backlogItemsConnection(
      where: $backlogItemsConnectionWhere3
    ) {
      totalCount
    }
    completedItemCount: backlogItemsConnection(
      where: $backlogItemsConnectionWhere4
    ) {
      totalCount
    }
    blockedItemCount: backlogItemsConnection(
      where: $backlogItemsConnectionWhere5
    ) {
      totalCount
    }
    inProgressItemCount: backlogItemsConnection(
      where: $backlogItemsConnectionWhere6
    ) {
      totalCount
    }
  }
`;
