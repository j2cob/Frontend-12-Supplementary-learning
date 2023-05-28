/* eslint-disable @next/next/no-sync-scripts */
import { CREATE_POINT_TRANSACTION_OF_LOADING } from "@/src/graphql/createPointTransactionOfLoading";
import { FETCH_USER_LOGGEDIN } from "@/src/graphql/fetchUserLoggedIn";
import { userInfoState } from "@/src/store/atom";
import { useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import Modal from "antd/lib/modal";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
const list = ["100", "500", "2,000", "5,000"];

export default function ChargeModal({ isModalOpen, onClose }) {
  const [value, setValue] = useState("");
  const [isShow, setIsShow] = useState("");
  const [user, setUser] = useRecoilState(userInfoState);

  const onChangeValue = (value) => {
    setValue(value);
    setIsShow(false);
  };

  const onClickCharge = () => {
    if (value.length === 0) {
      alert("충전금액을 선택해주세요.");
      return;
    }
    const IMP = window.IMP;
    IMP.init("imp49910675");
    IMP.request_pay(
      {
        pg: "html5_inicis",
        pay_method: "card",
        name: "포인트 충전",
        amount: Number(value.replace(",", "")),
        buyer_email: user?.email,
        buyer_name: user?.name,
        buyer_tel: "010-4242-4242",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
        m_redirect_url: "/",
      },
      function (rsp) {
        if (rsp.success) {
          alert("결제가 성공했습니다.");
          createPoint({
            variables: {
              impUid: rsp.imp_uid,
            },
          });
        } else {
          alert(rsp.error_msg);
        }
      }
    );
  };

  const onCompletedCharge = async () => {
    const userInfo = await refetch();
    setUser(userInfo.data?.fetchUserLoggedIn);
    localStorage.setItem(
      "userInfo",
      JSON.stringify(userInfo?.data?.fetchUserLoggedIn)
    );
    onClose();
  };

  const { refetch } = useQuery(FETCH_USER_LOGGEDIN, {
    skip: true,
  });
  const [createPoint] = useMutation(CREATE_POINT_TRANSACTION_OF_LOADING, {
    onCompleted: onCompletedCharge,
  });

  return (
    <>
      <Script
        type="text/javascript"
        src="https://code.jquery.com/jquery-1.12.4.min.js"
      />
      <Script
        type="text/javascript"
        src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"
      />
      <ModalContainer
        centered
        width={464}
        title=""
        open={isModalOpen}
        footer={null}
      >
        <CloseButton onClick={onClose}>
          <Image
            src="/images/icon-delete.png"
            alt="delete icon"
            width={16}
            height={16}
          />
        </CloseButton>
        <Title>충전하실 금액을 선택해주세요!</Title>
        <SelectInput onClick={() => setIsShow((prev) => !prev)}>
          <p style={{ color: value ? "#000" : "#E0E0E0 " }}>
            {" "}
            {value || "포인트 선택"}
          </p>
          <Image
            style={{ transform: isShow ? "rotate(180deg)" : "none" }}
            src="/images/icon-select.png"
            alt="arrow icon"
            width={24}
            height={24}
          />
        </SelectInput>
        {isShow && (
          <List>
            {list.map((item, index) => (
              <Item
                onClick={() => {
                  onChangeValue(item);
                }}
                style={{ color: value === item ? "#000" : "#E0E0E0 " }}
                key={index}
              >
                {item}
              </Item>
            ))}
          </List>
        )}
        <Button onClick={onClickCharge}>충전하기</Button>
      </ModalContainer>
    </>
  );
}

const ModalContainer = styled(Modal)({
  ".ant-modal-content": {
    borderRadius: 20,
    padding: "76px 40px 40px",
    position: "relative",
  },
  button: {
    cursor: "pointer",
  },
  input: { background: "transparent", border: 0 },
});
const Title = styled.p({ fontSize: 20, fontWeight: 700, textAlign: "center" });
const SelectInput = styled.button({
  width: 384,
  marginTop: 40,
  border: 0,
  background: "transparent",
  borderBottom: "1px solid #000",
  textAlign: "left",
  padding: "0 8px 16px",
  color: "#828282  ",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
const List = styled.div({
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  marginTop: 17,
});
const Item = styled.div({
  padding: 16,
  fontWeight: 700,
  borderBottom: "1px solid #E0E0E0",
  cursor: "pointer",
});

const Button = styled.button({
  backgroundColor: "#000",
  color: "#fff",
  width: "100%",
  height: 51,
  marginTop: 40,
  cursor: "pointer",
  fontWeight: 400,
  border: 0,
  borderRadius: 10,
});
const CloseButton = styled.button({
  border: 0,
  background: "transparent",
  position: "absolute",
  top: 20,
  right: 20,
  zIndex: 9909999,
});
