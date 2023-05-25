import Item from "@/src/components/Item";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/client";
import { FETCH_USED_ITEMS } from "./api/fetchUsedItems";
import { useState } from "react";

export default function Home() {
  const [list, setList] = useState([]);
  const onCompletedFetchBoard = (data) => {
    setList(data.fetchUseditems);
  };
  useQuery(FETCH_USED_ITEMS, {
    onCompleted: onCompletedFetchBoard,
  });

  return (
    <>
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
        {list.slice(0, 4).map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </List>
      <List>
        {list.slice(4, 8).map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </List>
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
