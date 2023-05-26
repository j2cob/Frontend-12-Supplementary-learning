import { useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import Question from "../Question";
import { FETCH_USED_ITEM_QUESTION } from "@/src/graphql/fetchUsedItemQuestion";
import InfiniteScroll from "react-infinite-scroller";
import { useForm } from "react-hook-form";
import { CREATE_USET_ITEM_QUESTION } from "@/src/graphql/createUsedItemQuestion";

export default function Questions({ user, useditemId }) {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  const { data, refetch, fetchMore } = useQuery(FETCH_USED_ITEM_QUESTION, {
    variables: { page: 0, useditemId },
  });
  const [createQuestion] = useMutation(CREATE_USET_ITEM_QUESTION, {
    onCompleted: () => refetch(),
  });

  const onClickRegister = async (data) => {
    const { contents } = data;
    if (contents.length === 0) {
      alert("내용을 작성해주세요");
    } else {
      createQuestion({
        variables: {
          useditemId,
          createUseditemQuestionInput: {
            contents,
          },
        },
      });
    }
  };

  const onLoadMore = () => {
    if (data === undefined) return;
    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchUseditemQuestions.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchUseditemQuestions === undefined) {
          return {
            fetchUseditemQuestions: [...prev.fetchUseditemQuestions],
          };
        }

        return {
          fetchUseditemQuestions: [
            ...prev.fetchUseditemQuestions,
            ...fetchMoreResult.fetchUseditemQuestions,
          ],
        };
      },
    });
  };

  return (
    <QuestionContainer>
      <QuestiontTitle>Q & A</QuestiontTitle>
      <Textarea
        row={10}
        {...register("contents")}
        placeholder="내용을 입력해 주세요."
      />
      <QuestionButton type="submit" onClick={handleSubmit(onClickRegister)}>
        작성하기
      </QuestionButton>
      <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
        {data?.fetchUseditemQuestions?.map((question) => (
          <Question
            refetch={refetch}
            key={question._id}
            user={user}
            question={question}
          />
        ))}
      </InfiniteScroll>
    </QuestionContainer>
  );
}

const QuestionButton = styled.button({
  backgroundColor: "#000",
  color: "#fff",
  width: 195,
  height: 77,
  margin: "17px 0 18px auto",
  cursor: "pointer",
  display: "block",
  fontSize: 20,
  fontWeight: 700,
  border: 0,
});
const QuestionContainer = styled.div({
  marginTop: 86,
  ".icon": {
    marginLeft: 15,
    verticalAlign: "middle",
  },
});
const QuestiontTitle = styled.p({
  fontWeight: 700,
  fontSize: 32,
  borderBottom: "3px solid #555",
  paddingBottom: 20,
  marginBottom: 71,
  opacity: 0.6,
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
