import styled from "@emotion/styled";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InfiniteScroll from "react-infinite-scroller";
import Answer from "../Answer";
import QuestionButtons from "../QuestionButtons";
import { CREATE_USED_ITEM_QUESTION_ANSWER } from "@/src/graphql/createUsedItemQuestionAnswer";
import { useMutation, useQuery } from "@apollo/client";
import { FETCH_USED_ITEM_QUESTION_ANSWER } from "@/src/graphql/fetchUseditemQuestionAnswers";
import { UPDATE_USED_ITEM_QUESTION } from "@/src/graphql/updateUsedItemQuestion";
import { DELETE_USED_ITEM_QUESTION } from "@/src/graphql/deleteUsedItemQuestion";

export default function Question({ user, question, refetch }) {
  const [isShowEdit, setIsShowEdit] = useState(false);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const { register, resetField, handleSubmit } = useForm({
    mode: "onChange",
  });

  //  수정
  const onClickIsShowEdit = () => {
    setIsShowEdit((prev) => !prev);
  };

  const onClickCancelEdit = () => {
    setIsShowEdit(false);
  };

  const onClickUpdate = async (data) => {
    const { contents } = data;
    updateUsedItemQuestion({
      variables: {
        updateUseditemQuestionInput: {
          contents,
        },
        useditemQuestionId: question?._id,
      },
    });
  };

  const onCompletedUpdateUsedItemQuestion = () => {
    refetch();
    resetField("contents");
    setIsShowEdit(false);
  };

  const [updateUsedItemQuestion] = useMutation(UPDATE_USED_ITEM_QUESTION, {
    onCompleted: onCompletedUpdateUsedItemQuestion,
  });

  // 삭제
  const onClickDelete = () => {
    deleteUsedItemQuestion({
      variables: {
        useditemQuestionId: question?._id,
      },
    });
  };

  const onCompletedDeleteUsedItemQuestion = () => {
    refetch();
  };

  const [deleteUsedItemQuestion] = useMutation(DELETE_USED_ITEM_QUESTION, {
    onCompleted: onCompletedDeleteUsedItemQuestion,
  });

  // 대댓글 등록
  const onClickIsShowAnswer = () => {
    resetField("answer");
    setIsShowAnswer((prev) => !prev);
  };

  const onClickCancelAnswer = () => {
    resetField("answer");
    setIsShowAnswer(false);
  };

  const onClickRegistAnswer = async (data) => {
    const { answer } = data;
    createUsedItemQuestionAnswer({
      variables: {
        createUseditemQuestionAnswerInput: {
          contents: answer,
        },
        useditemQuestionId: question?._id,
      },
    });
  };
  const onCompletedCreateUsedItemQuestionAnswer = () => {
    refetchAnswer();
    resetField("answer");
    setIsShowAnswer(false);
  };

  const [createUsedItemQuestionAnswer] = useMutation(
    CREATE_USED_ITEM_QUESTION_ANSWER,
    {
      onCompleted: onCompletedCreateUsedItemQuestionAnswer,
    }
  );

  // 대댓글 가져오기

  const onLoadMore = () => {
    if (answerData === undefined) return;
    fetchMore({
      variables: {
        page:
          Math.ceil(
            (answerData?.fetchUseditemQuestionAnswers.length ?? 10) / 10
          ) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchUseditemQuestionAnswers === undefined) {
          return {
            fetchUseditemQuestionAnswers: [
              ...prev.fetchUseditemQuestionAnswers,
            ],
          };
        }

        return {
          fetchUseditemQuestionAnswers: [
            ...prev.fetchUseditemQuestionAnswers,
            ...fetchMoreResult.fetchUseditemQuestionAnswers,
          ],
        };
      },
    });
  };

  const {
    data: answerData,
    refetch: refetchAnswer,
    fetchMore,
  } = useQuery(FETCH_USED_ITEM_QUESTION_ANSWER, {
    variables: {
      useditemQuestionId: question._id,
      page: 0,
    },
  });
  return (
    <>
      <QuestionItem>
        <QuestionWriter>{question?.user?.name}</QuestionWriter>
        <Right>
          <Row style={{ paddingBottom: 40 }}>
            <QuestionContents>{question.contents}</QuestionContents>
            <Row>
              <span>{dayjs(question.createdAt).format("YYYY.MM.DD")}</span>
              {user === question?.user?.email && (
                <QuestionButtons
                  onClickEdit={onClickIsShowEdit}
                  onClickDelete={onClickDelete}
                />
              )}
              <div>
                <button onClick={onClickIsShowAnswer}>
                  <Image
                    className="icon"
                    src="/images/icon-comment.png"
                    width={18}
                    height={18}
                    alt="image"
                  />
                </button>
              </div>
            </Row>
          </Row>
          {question && answerData?.fetchUseditemQuestionAnswers?.length > 0 && (
            <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
              {answerData?.fetchUseditemQuestionAnswers.map((item, index) => (
                <Answer
                  key={item._id}
                  answer={item}
                  email={user}
                  id={question._id}
                />
              ))}
            </InfiniteScroll>
          )}
          {/* 대댓글 달기 */}
          {isShowAnswer && (
            <AnswerContainer>
              <Textarea
                style={{ height: 152 }}
                row={3}
                {...register("answer")}
                placeholder="내용을 입력해 주세요."
              />
              <ButtonRow>
                <LightButton onClick={onClickCancelAnswer}>
                  취소하기
                </LightButton>

                <DarkButton
                  type="submit"
                  onClick={handleSubmit(onClickRegistAnswer)}
                >
                  작성하기
                </DarkButton>
              </ButtonRow>
            </AnswerContainer>
          )}
        </Right>
      </QuestionItem>
      {/* 댓글 수정 */}
      {isShowEdit && (
        <EditContainer>
          <Textarea
            defaultValue={question.contents}
            style={{ height: 76, padding: "27px 30px" }}
            row={3}
            {...register("contents")}
            placeholder="내용을 입력해 주세요."
          />
          <ButtonRow>
            <LightButton onClick={onClickCancelEdit}>취소하기</LightButton>

            <DarkButton type="submit" onClick={handleSubmit(onClickUpdate)}>
              수정하기
            </DarkButton>
          </ButtonRow>
        </EditContainer>
      )}
    </>
  );
}

const AnswerContainer = styled.div({
  borderTop: "1px solid #C0C0C0",
  padding: "20px 0",
});
const EditContainer = styled.div({
  borderTop: "1px solid #C0C0C0",
  padding: "20px 0",
  width: "100%",
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
const Row = styled.div({
  display: "flex",
  justifyContent: "space-between",
  button: {
    border: 0,
    cursor: "pointer",
    background: "transparent",
    padding: 0,
    margin: 0,
  },
});
const Right = styled.div({ width: "100%" });

const QuestionItem = styled.div({
  borderTop: "1px solid #C0C0C0",
  padding: "40px 0 0",
  display: "flex",
});
const QuestionWriter = styled.p({
  width: 104,
  lineHeight: "27px",
  height: "27px",
  background: "#000",
  color: "#fff",
  fontSize: 15,
  textAlign: "center",
  marginRight: 36,
});
const QuestionContents = styled.p({
  fontSize: 15,
  maxWidth: "calc(100% - 200px)",
  whiteSpace: "pre-line",
});
