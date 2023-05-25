import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Item({ item }) {
  const router = useRouter();
  return (
    <Container
      onClick={() => {
        router.push(`/brand/${0}`);
      }}
    >
      <Image
        src="http://placehold.it/600x400"
        width={348}
        height={466}
        alt="image"
      />
      <LikeButton>
        <Image src="/images/icon-like.png" width={21} height={18} alt="image" />
      </LikeButton>
      <Inner>
        <Row>
          <ItemTitle>대표 태그</ItemTitle>
          <ItemPrice>{item?.price}</ItemPrice>
        </Row>
        <ItemName>{item?.name}</ItemName>
        <ItemDescription>{item?.description}</ItemDescription>
      </Inner>
    </Container>
  );
}

const Container = styled.button({
  width: "calc((100% - 348px )/4)",
  position: "relative",
  marginBottom: 50,
  border: 0,
  background: "transparent",
  textAlign: "left",
  cursor: "pointer",
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
  height: 20,
  overflow: "hidden",
});
