import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
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
export default function Home() {
  return (
    <>
      <Header />
      <swiper-container>
        <swiper-slide>
          <Slider>Slide 1</Slider>
        </swiper-slide>
        <swiper-slide>
          <Slider>Slide 2</Slider>
        </swiper-slide>
        <swiper-slide>
          <Slider>Slide 3</Slider>
        </swiper-slide>
      </swiper-container>
      <Title>New Arrival</Title>
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
      </List>{" "}
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
      <Footer />
    </>
  );
}

const Slider = styled.div({
  height: 750,
  background: "#ddd",
  fontSize: 30,
  textAlign: "center",
  lineHeight: "750px",
});
const Title = styled.p({
  marginTop: 90,
  marginBottom: 98,
  fontWeight: 700,
  fontSize: 22,
  textAlign: "center",
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
