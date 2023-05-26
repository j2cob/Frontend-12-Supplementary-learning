import { CREATE_USET_ITEM_QUESTION_ANSWER } from "@/src/graphql/createUsedItemQuestionAnswer";
import { FETCH_USED_ITEM_QUESTION_ANSWER } from "@/src/graphql/fetchUseditemQuestionAnswers";
import { useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InfiniteScroll from "react-infinite-scroller";
import { DELETE_USET_ITEM_QUESTION_ANSWER } from "@/src/graphql/deleteUseditemQuestionAnswer";
import Answer from "../Answer";

export default function Answers({ id, email }) {
  const [isShowAnswer, setIsShowAnswer] = useState(false);

  const { register, resetField, handleSubmit } = useForm({
    mode: "onChange",
  });

  const onCompletedCreateUsedItemQuestionAnswer = () => {
    refetch();
    resetField("contents");
    setIsShowAnswer(false);
  };

  const onCompletedDeleteAnswer = () => {
    console.log("onCompletedDeleteAnswer");
    refetch();
  };

  const [createUsedItemQuestionAnswer] = useMutation(
    CREATE_USET_ITEM_QUESTION_ANSWER,
    {
      onCompleted: onCompletedCreateUsedItemQuestionAnswer,
    }
  );

  const [deleteAnswer] = useMutation(
    DELETE_USET_ITEM_QUESTION_ANSWER,
    onCompletedDeleteAnswer
  );

  const onClickCancelAnswer = () => {
    setIsShowAnswer(false);
  };

  const onClickIsShowEdit = () => {
    setIsShowEdit((prev) => !prev);
  };

  const onClickRegistAnswer = async (data) => {
    const { contents } = data;
    createUsedItemQuestionAnswer({
      variables: {
        createUseditemQuestionAnswerInput: {
          contents,
        },
        useditemQuestionId: id,
      },
    });
  };

  const onClickDelete = (useditemQuestionAnswerId) => {
    deleteAnswer({
      variables: {
        useditemQuestionAnswerId,
      },
    });
  };

  return <></>;
}

const Row = styled.div({
  display: "flex",
  justifyContent: "space-between",
  button: {
    border: 0,
    cursor: "pointer",
  },
});
const AnswerContainer = styled.div({
  borderTop: "1px solid #C0C0C0",
  paddingTop: 20,
});
const ButtonRow = styled.div({
  display: "flex",
  justifyContent: "space-between",
  justifyContent: "flex-end",
  marginTop: 15,
});
const LightButton = styled.button({
  "&&": {
    width: 195,
    height: 77,
    cursor: "pointer",
    display: "block",
    fontSize: 20,
    fontWeight: 700,
    border: "1px solid #555",
    marginRight: 16,
    background: "transparent",
    color: "#555",
  },
});
const DarkButton = styled.button({
  backgroundColor: "#000",
  color: "#fff",
  width: 195,
  height: 77,
  cursor: "pointer",
  display: "block",
  fontSize: 20,
  fontWeight: 700,
  border: 0,
});
const Textarea = styled.textarea({
  width: "100%",
  background: "#E9E9E9",
  border: 0,
  padding: "36px",
  fontSize: 15,
  resize: "none",
  height: 230,
  "&::placeholder": {
    color: "#BDBDBD      ",
  },
});

const AnswerBox = styled.div({
  borderTop: "1px dotted #C0C0C0",
  padding: "30px 0",
});
