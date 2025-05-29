import { gql } from "@apollo/client";

export const GET_ITEM_COUNT_BY_STATUS = gql`
  query BacklogItemsConnection($where: BacklogItemWhere) {
    backlogItemsConnection(where: $where) {
      totalCount
    }
  }
`;
