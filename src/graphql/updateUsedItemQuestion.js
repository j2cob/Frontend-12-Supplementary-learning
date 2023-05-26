import { gql } from "@apollo/client";

export const UPDATE_USED_ITEM_QUESTION = gql`
  mutation updateUseditemQuestion(
    $updateUseditemQuestionInput: UpdateUseditemQuestionInput!
    $useditemQuestionId: ID!
  ) {
    pdateUseditemQuestion(
      updateUseditemQuestionInput: updateUseditemQuestionInput
      useditemQuestionId: useditemQuestionId
    ) {
      _id
    }
  }
`;
