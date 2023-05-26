import { FETCH_USED_ITEM_QUESTION_ANSWER } from "@/src/graphql/fetchUseditemQuestionAnswers";
import { useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import QuestionButtons from "../QuestionButtons";
import { DELETE_USET_ITEM_QUESTION_ANSWER } from "@/src/graphql/deleteUseditemQuestionAnswer";
import { UPDATE_USET_ITEM_QUESTION_ANSWER } from "@/src/graphql/updateUseditemQuestionAnswer";

export default function Answer({ id, answer, email }) {
  const [isShowUpdate, setIsShowUpdate] = useState(false);

  const { register, resetField, handleSubmit } = useForm({
    mode: "onChange",
  });

  const onCompletedDeleteAnswer = () => {
    refetch();
  };

  const onCompletedUpdateAnswer = () => {
    resetField("answer");
    refetch();
    setIsShowUpdate(false);
  };

  const { refetch } = useQuery(FETCH_USED_ITEM_QUESTION_ANSWER, {
    variables: {
      useditemQuestionId: id,
      page: 0,
    },
  });

  const [deleteAnswer] = useMutation(DELETE_USET_ITEM_QUESTION_ANSWER, {
    onCompleted: onCompletedDeleteAnswer,
  });
  const [updateAnswer] = useMutation(UPDATE_USET_ITEM_QUESTION_ANSWER, {
    onCompleted: onCompletedUpdateAnswer,
  });

  const onClickIsShowUpdate = () => {
    setIsShowUpdate((prev) => !prev);
  };

  const onClickCancelUpdate = () => {
    setIsShowUpdate(false);
  };

  const onClickUpdate = async (data) => {
    const { contents } = data;
    const variables = {
      useditemQuestionAnswerId: answer._id,
      updateUseditemQuestionAnswerInput: {
        contents,
      },
    };
    updateAnswer({
      variables,
    });
  };

  const onClickDelete = (useditemQuestionAnswerId) => {
    deleteAnswer({
      variables: {
        useditemQuestionAnswerId,
      },
    });
  };

  return (
    <>
      <AnswerBox>
        <Row>
          <b>답변</b>
          {email === answer?.user?.email && (
            <QuestionButtons
              onClickEdit={onClickIsShowUpdate}
              onClickDelete={() => onClickDelete(answer._id)}
            />
          )}
        </Row>
        <p style={{ color: "#999", marginTop: 28 }}>
          {dayjs(answer.createdAt).format("YYYY.MM.DD")}
        </p>
        <p style={{ marginTop: 16 }}>{answer.contents}</p>
      </AnswerBox>
      {/* 수정하기 */}
      {isShowUpdate && (
        <AnswerContainer>
          <Textarea
            style={{ height: 152 }}
            row={3}
            defaultValue={answer.contents}
            {...register("contents")}
            placeholder="내용을 입력해 주세요."
          />
          <ButtonRow>
            <LightButton type="submit" onClick={onClickCancelUpdate}>
              취소하기
            </LightButton>

            <DarkButton type="submit" onClick={handleSubmit(onClickUpdate)}>
              수정하기
            </DarkButton>
          </ButtonRow>
        </AnswerContainer>
      )}
    </>
  );
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
  padding: "20px 0",
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
