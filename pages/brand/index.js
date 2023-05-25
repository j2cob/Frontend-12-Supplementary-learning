import Item from "@/src/components/Item";
import { useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import { FETCH_BOARDS } from "../api/fetchBoards";

const list = [
  {
    price: "27,500",
    name: "조이조이",
    description: "[당일출고/주문폭주] 노티드 캔버스 패브릭 가방 4col...",
  },
  {
    price: "27,500",
    name: "조이조이",
    description: "[당일출고/주문폭주] 노티드 캔버스 패브릭 가방 4col...",
  },
  {
    price: "27,500",
    name: "조이조이",
    description: "[당일출고/주문폭주] 노티드 캔버스 패브릭 가방 4col...",
  },
  {
    price: "27,500",
    name: "조이조이",
    description: "[당일출고/주문폭주] 노티드 캔버스 패브릭 가방 4col...",
  },
];

export default function Brand() {
  const router = useRouter();
  const onClickAdd = () => {
    router.push("/add");
  };

  const onCompletedFetchBoard = (data) => {
    console.log(data);
  };
  useQuery(FETCH_BOARDS, {
    onCompleted: onCompletedFetchBoard,
  });

  return (
    <Container>
      <BestList>
        <Title>BEST</Title>
        <ItemRow>
          {list.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </ItemRow>
      </BestList>
      <MiddleRow>
        <AddButton onClick={onClickAdd}>상품 등록</AddButton>
        <Input>
          <input type="text" name="search" value="" />
          <Image
            src="/images/icon-search.png"
            width={24}
            height={24}
            alt="image"
          />
        </Input>
      </MiddleRow>

      <List>
        {list.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </List>
      <List>
        {list.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </List>
    </Container>
  );
}

const Container = styled.div({
  background: "#f5f5f5",
  minHeight: "100%",
  paddingTop: 30,
});
const AddButton = styled.button({
  width: 195,
  height: 77,
  cursor: "pointer",
  fontSize: 20,
  fontWeight: 700,
  backgroundColor: "#fff",
});
const Title = styled.p({
  fontSize: 22,
  fontWeight: 500,
  opacity: 0.6,
  textAlign: "center",
  marginBottom: 86,
});
const BestList = styled.div({
  background: "#fff",
  paddingTop: 43,
  margin: "0 50px 37px",
});
const MiddleRow = styled.div({
  display: "flex",
  borderBottom: "1px solid #555555",
  margin: "0 82px 45px",
  padding: "18px 0",
  justifyContent: "space-between",
});
const Input = styled.div({
  borderBottom: "3px solid #555555",
  position: "relative",
  width: 534,
  input: {
    width: "100%",
    height: "100%",
    paddingRight: 20,
    backgroundColor: "transparent",
    border: 0,
  },
  img: {
    position: "absolute",
    right: 0,
    bottom: 10,
  },
});
const ItemRow = styled.div({
  display: "flex",
  justifyContent: "space-between",
  padding: "0 90px",
  maxWidth: 1920,
  margin: "0 auto",
});
const List = styled.div({
  display: "flex",
  justifyContent: "space-between",
  padding: "0 90px",
  maxWidth: 1920,
  margin: "0 auto",
});
