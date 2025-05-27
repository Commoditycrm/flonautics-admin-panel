import { gql } from "@apollo/client";

export const GET_MEMBERS_IN_ORG = gql`
  query MemberUsers(
    $where: OrganizationWhere
    $options: UserOptions
    $memberUsersWhere: UserWhere
    $connectionWhere: OrganizationMemberUsersConnectionWhere
  ) {
    organizations(where: $where) {
      id
      memberUsersConnection(where: $connectionWhere) {
        totalCount
      }
      memberUsers(options: $options, where: $memberUsersWhere) {
        id
        email
        name
        externalId
        role
        createdAt
      }
    }
  }
`;
