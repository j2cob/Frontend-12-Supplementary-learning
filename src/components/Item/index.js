import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Item({ item }) {
  const router = useRouter();
  return (
    <Container
      onClick={() => {
        router.push(`/brand/${item._id}`);
      }}
    >
      <ThumbnailImage>
        <Image
          src={`https://storage.googleapis.com/${item?.images[0]}`}
          width={348}
          height={466}
          alt="image"
        />
      </ThumbnailImage>
      <LikeButton>
        <Image
          src={"/images/icon-like.png"}
          width={21}
          height={18}
          alt="image"
        />
      </LikeButton>
      <Inner>
        <Row>
          <ItemTags>{item?.tags[0]}</ItemTags>
          <ItemPrice>{item?.price}</ItemPrice>
        </Row>
        <ItemName>{item?.seller?.name}</ItemName>
        <ItemDescription>{item?.remarks}</ItemDescription>
      </Inner>
    </Container>
  );
}

const Container = styled.div({
  width: "calc((100% - 348px)/4)",
  float: "left",
  position: "relative",
  marginBottom: 50,
  border: 0,
  background: "transparent",
  textAlign: "left",
  cursor: "pointer",
  "& + &": {
    marginLeft: "116px",
  },
  "&:nth-of-type(4n+1)": {
    marginLeft: 0,
  },
  img: {
    width: "100% ",
    objectFit: "cover",
  },
});
const ThumbnailImage = styled.div({
  height: 466,
  width: "100%",
  overflow: "hidden",
  background: "#ddd",
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
const ItemTags = styled.p({
  color: "#F65656",
  fontSize: 20,
  fontWeight: 700,
  opacity: 0.6,
  height: 30,
  overflow: "hidden",
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
