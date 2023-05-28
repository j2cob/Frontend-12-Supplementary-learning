import Item from "@/src/components/Item";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/client";
import { FETCH_USED_ITEMS } from "../src/graphql/fetchUsedItems";
import { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import { useRecoilState } from "recoil";
import { userInfoState } from "@/src/store/atom";
import { FETCH_USER_LOGGEDIN } from "@/src/graphql/fetchUserLoggedIn";

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
        <SliderContainer></SliderContainer>
        <SliderContainer bg={"red"}></SliderContainer>
        <SliderContainer bg={"green"}></SliderContainer>
        <SliderContainer bg={"yellow"}></SliderContainer>
        <SliderContainer bg={"skyblue"}></SliderContainer>
        <SliderContainer bg={"black"}></SliderContainer>
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

const SliderContainer = styled.div((props) => ({
  height: 750,
  background: props.bg || "#ddd",
  fontSize: 30,
  textAlign: "center",
  lineHeight: "750px",
}));
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
