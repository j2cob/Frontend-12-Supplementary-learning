import { gql } from "@apollo/client";

export const FETCH_USED_ITEM_QUESTION_ANSWER = gql`
  query fetchUseditemQuestionAnswers($page: Int, $useditemQuestionId: ID!) {
    fetchUseditemQuestionAnswers(
      page: $page
      useditemQuestionId: $useditemQuestionId
    ) {
      _id
      contents
      user {
        name
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;
