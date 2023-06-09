import { gql } from "@apollo/client";

export const FETCH_USED_ITEM_QUESTION = gql`
  query fetchUseditemQuestions($page: Int, $useditemId: ID!) {
    fetchUseditemQuestions(page: $page, useditemId: $useditemId) {
      _id
      contents
      user {
        name
        email
      }
      createdAt
    }
  }
`;
