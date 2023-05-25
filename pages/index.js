import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import Item from "@/src/components/Item";
import styled from "@emotion/styled";

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
          <Item key={index} item={item} />
        ))}
      </List>
      <List>
        {list.map((item, index) => (
          <Item key={index} item={item} />
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
