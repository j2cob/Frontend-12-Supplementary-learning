import styled from "@emotion/styled";
import Modal from "antd/lib/modal";
import Image from "next/image";
import { useState } from "react";
const list = ["100", "500", "2,000", "5,000"];

export default function ChargeModal({ isModalOpen, onClose }) {
  const [value, setValue] = useState("");
  const [isShow, setIsShow] = useState("");

  const onChangeValue = (value) => {
    setValue(value);
    setIsShow(false);
  };
  return (
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
      <Button>충전하기</Button>
    </ModalContainer>
  );
}

const ModalContainer = styled(Modal)({
  ".ant-modal-content": {
    borderRadius: 20,
    padding: "76px 40px 40px",
    position: "relative",
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
