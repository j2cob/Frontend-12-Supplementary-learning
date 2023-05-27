import styled from "@emotion/styled";
import { useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { accessTokenState, userInfoState } from "@/src/store/atom";
import { LOGIN_USER } from "@/src/graphql/loginUser";
import { FETCH_USER_LOGGEDIN } from "@/src/graphql/fetchUserLoggedIn";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useRecoilState(accessTokenState);
  const [user, setUser] = useRecoilState(userInfoState);

  const onCompletedCreateUser = async (data) => {
    setToken(data?.loginUser.accessToken);
    const userInfo = await refetch();
    setUser(userInfo.data?.fetchUserLoggedIn);
    localStorage.setItem("accessToken", data?.loginUser.accessToken);
    localStorage.setItem(
      "userInfo",
      JSON.stringify(userInfo?.data?.fetchUserLoggedIn)
    );
    router.replace("/");
  };

  const [loginUser, {}] = useMutation(LOGIN_USER, {
    onCompleted: onCompletedCreateUser,
    onError: (error) => {
      alert(error.message);
    },
  });

  const onClickLogin = () => {
    loginUser({
      variables: { email, password },
    });
  };

  const { refetch } = useQuery(FETCH_USER_LOGGEDIN, {
    skip: true,
  });

  return (
    <>
      <Title>LOGIN</Title>
      <FormContainer>
        <Form>
          <Row style={{ marginBottom: 24 }}>
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
        </Form>
        <Button onClick={onClickLogin}>로그인</Button>
      </FormContainer>
    </>
  );
}

const Title = styled.p({
  textAlign: "center",
  fontSize: 40,
  padding: "95px 0 114px",
  borderBottom: "3px solid #555",
  maxWidth: "1737px",
  margin: "0 auto",
});
const Form = styled.div({
  input: {
    width: 611,
    background: "#E9E9E9",
    height: 56,
    border: 0,
    padding: "0 18px",
    fontSize: 15,
  },
});
const FormContainer = styled.div({
  display: "flex",
  alignItems: "center",
  width: 940,
  margin: "172px auto 312px",
});
const Row = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const Label = styled.p({
  fontSize: 24,
  width: 113,
  fontSize: 24,
});
const Button = styled.button({
  backgroundColor: "#000",
  color: "#fff",
  width: 186,
  height: 136,
  marginLeft: 31,
  cursor: "pointer",
  fontSize: 20,
  fontWeight: 700,
});
