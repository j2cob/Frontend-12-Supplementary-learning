import { LOGOUT_USER } from "@/src/graphql/logoutUser";
import { accessTokenState, userInfoState } from "@/src/store/atom";
import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";
import ChargeModal from "../ChargeModal";
import { useAuthRouter } from "@/src/hooks/useAuthRouter";

export default function Header() {
  const { getRouterBlock } = useAuthRouter();
  const accessToken = useRecoilValue(accessTokenState);
  const [token, setToken] = useRecoilState(accessTokenState);
  const [user, setUser] = useRecoilState(userInfoState);
  const [isOpenCharge, setIsOpenCharge] = useState(false);

  const onCompletedLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  const [logout] = useMutation(LOGOUT_USER, {
    onCompleted: onCompletedLogout,
  });

  const onClickLogin = () => {
    if (accessToken) {
      logout();
    } else {
      getRouterBlock("/login");
    }
  };

  //충전
  const onClickCharge = () => {
    setIsOpenCharge(true);
  };

  const onCloseModal = () => {
    setIsOpenCharge(false);
  };

  return (
    <Container>
      <Top>
        <Link href="/">
          <Image
            src="/images/image-logo.png"
            alt="logo"
            width={182}
            height={49}
          />
        </Link>

        <Right>
          {accessToken && (
            <>
              <p>
                <b>홍길동</b>님 포인트 <em>1,490 P</em>
              </p>
              <ChargeButton onClick={onClickCharge}>충전</ChargeButton>
            </>
          )}
          <button onClick={onClickLogin}>
            {accessToken ? "로그아웃" : "로그인"}
          </button>
          {!accessToken && <Link href="/join">회원가입</Link>}
          <button onClick={() => getRouterBlock("/cart")}>
            장바구니<Badge>0</Badge>
          </button>
        </Right>
      </Top>
      <Nav>
        <Inner>
          <button onClick={() => getRouterBlock("/brand")}>BRAND</button>
          <button onClick={() => getRouterBlock("/category")}>CATEGORY</button>
          <button onClick={() => getRouterBlock("/life")}>LIFE</button>
          <button onClick={() => getRouterBlock("/beauty")}>BEAUTY</button>
          <button />
          <button onClick={() => getRouterBlock("/style")}>#STYLE</button>
          <button onClick={() => getRouterBlock("/event")}>EVENT</button>
        </Inner>
      </Nav>
      <ChargeModal isModalOpen={isOpenCharge} onClose={onCloseModal} />
    </Container>
  );
}

const ChargeButton = styled.button({
  marginRight: 28,
  textDecoration: "underline",
});
const Container = styled.div({
  position: "fixed",
  top: 0,
  width: "100%",
  zIndex: 999,
  background: "#fff",
});
const Top = styled.div({
  padding: "26px 76px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: 1920,
  margin: "0 auto",
  a: {
    margin: "0 28px",
    fontSize: 14,
  },
  button: {
    border: 0,
    cursor: "pointer",
    backgroundColor: "transparent",
  },
});
const Right = styled.div({
  display: "flex",
  alignItems: "center",
  fontSize: 14,
  p: {
    marginRight: 20,
  },
  button: {
    marginRight: 28,
  },
  em: {
    textDecoration: "underline",
    fontStyle: "initial",
  },
});
const Badge = styled.span({
  width: 20,
  height: 20,
  background: "#F65656",
  color: "#fff",
  fontSize: 12,
  display: "inline-block",
  borderRadius: "50%",
  textAlign: "center",
  lineHeight: "18px",
  verticalAlign: "middle",
  marginLeft: 5,
});
const Nav = styled.div({
  background: "#000",
  color: "#fff",
});
const Inner = styled.div({
  maxWidth: "1220px",
  margin: "0 auto",
  padding: "40px 0",
  button: {
    display: "inline-block",
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: "-0.5px",
    marginRight: 122,
    background: "transparent",
    color: "#fff",
    border: 0,
    cursor: "pointer",
    "&:last-child": {
      margin: 0,
    },
  },
});
const Line = styled.em({
  display: "inline-block",
  width: 2,
  height: 19,
  backgroundColor: "#fff",
  marginRight: "136px",
});
