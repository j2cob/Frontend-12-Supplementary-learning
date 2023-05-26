import { FETCH_USED_ITEM_QUESTION_ANSWER } from "@/src/graphql/fetchUseditemQuestionAnswers";
import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import Image from "next/image";

export default function Question({ questions }) {
  const onCompletedFetchAnswer = () => {};

  // useQuery(FETCH_USED_ITEM_QUESTION_ANSWER, {
  //   variables:
  //   onCompleted: onCompletedFetchAnswer,
  // });
  return (
    <QuestionContainer>
      <QuestiontTitle>Q & A</QuestiontTitle>
      <Textarea row={10} placeholder="내용을 입력해 주세요." />
      <ButtonDark>작성하기</ButtonDark>
      {questions?.map((item, index) => (
        <QuestionItem key={index}>
          <QuestionWriter>{item.writer}</QuestionWriter>
          <Right>
            <Row>
              <QuestionContents>{item.contents}</QuestionContents>
              <div>
                <span>{item.createdAt}</span>
                <button style={{ marginLeft: 30 }}>
                  <Image
                    className="icon"
                    src="/images/icon-edit.png"
                    width={14}
                    height={13}
                    alt="image"
                  />
                </button>
                <button style={{ marginLeft: 10 }}>
                  <Image
                    className="icon"
                    src="/images/icon-delete-light.png"
                    width={14}
                    height={13}
                    alt="image"
                  />
                </button>
              </div>
            </Row>
            {/* {item.answer && (
              <Answer>
                <p>
                  <b>답변</b>
                </p>
                <p style={{ color: "#999", marginTop: 28 }}>
                  {item.answer.createdAt}
                </p>
                <p style={{ marginTop: 16 }}>{item.answer.contents}</p>
              </Answer>
            )} */}
          </Right>
        </QuestionItem>
      ))}
    </QuestionContainer>
  );
}

const QuestionContainer = styled.div({
  marginTop: 86,
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
const Row = styled.div({
  display: "flex",
  justifyContent: "space-between",
  button: {
    border: 0,
  },
});
const Right = styled.div({ width: "100%" });
const ButtonDark = styled.button({
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
const QuestionItem = styled.div({
  borderTop: "1px solid #C0C0C0",
  padding: "40px 0",
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
  paddingBottom: 40,
});
const Answer = styled.div({
  borderTop: "1px dotted #C0C0C0",
  paddingTop: 30,
});
