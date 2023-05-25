import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";

const dummy = [
  {
    writer: "노은정",
    contents: "사이즈가 더 큰 건 없나요?",
    createdAt: "2022. 03. 30",
    answer: {
      content: `안녕하세요, 고객님! 저희 제품에 관심 가져주셔서 감사드립니다.
    현재 더 큰 사이즈 상품은 없습니다.
    궁금하신 사항은 언제든지 문의 부탁드립니다.
    감사합니다.`,
      contents: "사이즈가 더 큰 건 없나요?",
      createdAt: "2022. 03. 30",
    },
  },
  {
    writer: "노은정",
    contents: "재입고 언제되나요 ㅠㅠ",
    createdAt: "2022. 03. 30",
    answer: {
      content: `안녕하세요, 고객님! 저희 제품에 관심 가져주셔서 감사드립니다.

      28일 재입고 예정입니다.
      궁금하신 사항은 언제든지 문의 부탁드립니다.
      감사합니다.`,
      contents: "사이즈가 더 큰 건 없나요?",
      createdAt: "2022. 03. 30",
    },
  },
  {
    writer: "노은정",
    contents: "재입고 언제되나요 ㅠㅠ",
    createdAt: "2022. 03. 30",
  },
];
export default function Comment() {
  const [list, setList] = useState(dummy);
  return (
    <CommentContainer>
      <CommenttTitle>Q & A</CommenttTitle>
      <Textarea row={10} placeholder="내용을 입력해 주세요." />
      <ButtonDark>작성하기</ButtonDark>
      {list.map((item, index) => (
        <CommentItem key={index}>
          <CommentWriter>{item.writer}</CommentWriter>
          <Right>
            <Row>
              <CommentContents>{item.contents}</CommentContents>
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
            {item.answer && (
              <Answer>
                <p>
                  <b>답변</b>
                </p>
                <p style={{ color: "#999", marginTop: 28 }}>
                  {item.answer.createdAt}
                </p>
                <p style={{ marginTop: 16 }}>{item.answer.contents}</p>
              </Answer>
            )}
          </Right>
        </CommentItem>
      ))}
    </CommentContainer>
  );
}

const CommentContainer = styled.div({
  marginTop: 86,
});
const CommenttTitle = styled.p({
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
const CommentItem = styled.div({
  borderTop: "1px solid #C0C0C0",
  padding: "40px 0",
  display: "flex",
});
const CommentWriter = styled.p({
  width: 104,
  lineHeight: "27px",
  height: "27px",
  background: "#000",
  color: "#fff",
  fontSize: 15,
  textAlign: "center",
  marginRight: 36,
});
const CommentContents = styled.p({
  fontSize: 15,
  paddingBottom: 40,
});
const Answer = styled.div({
  borderTop: "1px dotted #C0C0C0",
  paddingTop: 30,
});
