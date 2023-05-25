import Item from "@/src/components/Item";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/client";
import { FETCH_USED_ITEMS } from "./graphql/fetchUsedItems";
import { useState } from "react";
import Slider from "react-slick";

export default function Home() {
  const [list, setList] = useState([]);
  const onCompletedFetchBoard = (data) => {
    setList(data.fetchUseditems);
  };
  useQuery(FETCH_USED_ITEMS, {
    variables: { page: 1 },
    onCompleted: onCompletedFetchBoard,
  });
  const settings = {
    dots: false,
    infinite: false,
  };
  return (
    <>
      <Slider {...settings}>
        <SliderContainer>
          <h3> slider 1</h3>
        </SliderContainer>
        <SliderContainer>
          <h3> slider 2</h3>
        </SliderContainer>
        <SliderContainer>
          <h3> slider 3</h3>
        </SliderContainer>
        <SliderContainer>
          <h3> slider 4</h3>
        </SliderContainer>
        <SliderContainer>
          <h3> slider 5</h3>
        </SliderContainer>
        <SliderContainer>
          <h3> slider 6</h3>
        </SliderContainer>
      </Slider>
      <Title>New Arrival</Title>
      <List>
        {list.slice(0, 8).map((item, index) => (
          <Item key={item._id} item={item} />
        ))}
      </List>
    </>
  );
}

const SliderContainer = styled.div({
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
  overflow: "hidden",
  padding: "0 90px",
  maxWidth: 1920,
  margin: "0 auto",
});
