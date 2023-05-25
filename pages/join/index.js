import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { useState } from "react";
import { CREATE_USER } from "../graphql/createUser";

export default function Join() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");

  const onCompletedCreateUser = (data) => {
    alert("회원가입이 완료됬습니다.");
  };

  const [createUser, {}] = useMutation(CREATE_USER, {
    onCompleted: onCompletedCreateUser,
  });

  const onClickLogin = () => {
    createUser({
      variables: {
        email,
        password,
        name,
      },
    });
  };

  return (
    <>
      <Title>JOIN MEMBER</Title>
      <Inner>
        <Form>
          <Row>
            <Label>아이디</Label>
            <input
              type="text"
              name="email"
              value={email}
              placeholder="이메일 아이디를 @까지 정확하게 입력하세요"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Row>
          <Row>
            <Label>비밀번호</Label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="영문+숫자 조합 8~16자리를 입력해주세요."
              onChange={(e) => setPassword(e.target.value)}
            />
          </Row>
          <Row>
            <Label>비밀번호 확인</Label>
            <input
              type="password"
              name="passwordConfirm"
              value={passwordConfirm}
              placeholder="영문+숫자 조합 8~16자리를 입력해주세요."
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </Row>
          <Row>
            <Label>이름</Label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="ex) 홍길동"
              onChange={(e) => setName(e.target.value)}
            />
          </Row>
        </Form>
      </Inner>
      <ButtonContainer>
        <Button onClick={onClickLogin}>취소</Button>
        <ButtonDark onClick={onClickLogin}>확인</ButtonDark>
      </ButtonContainer>
    </>
  );
}

const Title = styled.p({
  textAlign: "center",
  fontSize: 40,
  padding: "95px 0 114px",
});
const Form = styled.div({
  padding: "0 54px",
  margin: "41px 0 39px",
  input: {
    width: 611,
    background: "#E9E9E9",
    height: 56,
    border: 0,
    padding: "0 18px",
    fontSize: 15,
  },
});
const Inner = styled.div({
  borderTop: "3px solid #555",
  borderBottom: "3px solid #555",
  maxWidth: "1737px",
  margin: "0 auto",
});
const Row = styled.div({
  display: "flex",
  alignItems: "center",
  marginBottom: 31,
});
const Label = styled.p({
  fontSize: 24,
  width: 170,
  fontSize: 24,
});
const ButtonContainer = styled.div({
  marginTop: 68,
  marginBottom: 100,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const Button = styled.button({
  width: 186,
  height: 56,
  marginLeft: 31,
  cursor: "pointer",
  fontSize: 20,
  fontWeight: 700,
  backgroundColor: "#fff",
});
const ButtonDark = styled.button({
  backgroundColor: "#000",
  color: "#fff",
  width: 186,
  height: 56,
  marginLeft: 31,
  cursor: "pointer",
  fontSize: 20,
  fontWeight: 700,
});
