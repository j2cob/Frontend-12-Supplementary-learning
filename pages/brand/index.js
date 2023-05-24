import styled from "@emotion/styled";
import Image from "next/image";

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
  return (
    <>
      <Container>
        <BestList>
          <Title>BEST</Title>
          <ItemRow>
            {list.map((item, index) => (
              <Item key={index}>
                <Image
                  src="http://placehold.it/600x400"
                  width={348}
                  height={466}
                  alt="image"
                />
                <LikeButton>
                  <Image
                    src="/images/icon-like.png"
                    width={21}
                    height={18}
                    alt="image"
                  />
                </LikeButton>
                <Inner>
                  <Row>
                    <ItemTitle>대표 태그</ItemTitle>
                    <ItemPrice>{item.price}</ItemPrice>
                  </Row>
                  <ItemName>{item.name}</ItemName>
                  <ItemDescription>{item.description}</ItemDescription>
                </Inner>
              </Item>
            ))}
          </ItemRow>
        </BestList>
        <MiddleRow>
          <AddButton>상품 등록</AddButton>
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
            <Item key={index}>
              <Image
                src="http://placehold.it/600x400"
                width={348}
                height={466}
                alt="image"
              />
              <LikeButton>
                <Image
                  src="/images/icon-like.png"
                  width={21}
                  height={18}
                  alt="image"
                />
              </LikeButton>
              <Inner>
                <Row>
                  <ItemTitle>대표 태그</ItemTitle>
                  <ItemPrice>{item.price}</ItemPrice>
                </Row>
                <ItemName>{item.name}</ItemName>
                <ItemDescription>{item.description}</ItemDescription>
              </Inner>
            </Item>
          ))}
        </List>
        <List>
          {list.map((item, index) => (
            <Item key={index}>
              <Image
                src="http://placehold.it/600x400"
                width={348}
                height={466}
                alt="image"
              />
              <LikeButton>
                <Image
                  src="/images/icon-like.png"
                  width={21}
                  height={18}
                  alt="image"
                />
              </LikeButton>
              <Inner>
                <Row>
                  <ItemTitle>대표 태그</ItemTitle>
                  <ItemPrice>{item.price}</ItemPrice>
                </Row>
                <ItemName>{item.name}</ItemName>
                <ItemDescription>{item.description}</ItemDescription>
              </Inner>
            </Item>
          ))}
        </List>
      </Container>
    </>
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
const Item = styled.div({
  width: "calc((100% - 348px )/4)",
  position: "relative",
  marginBottom: 50,
  img: {
    width: "100% ",
  },
});
const LikeButton = styled.button({
  position: "absolute",
  top: 34,
  right: 34,
  border: 0,
  background: "none",
});
const Row = styled.div({
  display: "flex",
});
const Inner = styled.div({
  padding: 20,
});
const ItemTitle = styled.p({
  color: "#F65656",
  fontSize: 20,
  fontWeight: 700,
  opacity: 0.6,
});
const ItemPrice = styled.p({
  marginLeft: 14,
  fontSize: 20,
  fontWeight: 700,
  opacity: 0.6,
});
const ItemName = styled.p({
  marginTop: 14,
  fontSize: 16,
  color: "#555555",
  fontWeight: 500,
  opacity: 0.6,
});
const ItemDescription = styled.p({
  marginTop: 14,
  fontSize: 14,
  color: "#555555",
  opacity: 0.6,
});
