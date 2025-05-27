import { gql } from "@apollo/client";

export const GET_MEMBERS_IN_ORG = gql`
  query getMembersOfOrg(
    $options: UserOptions
    $where: UserWhere
    $usersConnectionWhere2: UserWhere
  ) {
    users(options: $options, where: $where) {
      id
      name
      email
      createdAt
      role
    }
    usersConnection(where: $usersConnectionWhere2) {
      totalCount
    }
  }
`;
