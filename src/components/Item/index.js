import { TOGGLE_USED_ITEM_PICK } from "@/src/graphql/toggleUseditemPick";
import { useAuthRouter } from "@/src/hooks/useAuthRouter";
import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Item({ item }) {
  const { getRouterBlock } = useAuthRouter();
  const [islike, setIsLike] = useState(false);

  const onTogglePick = (e) => {
    e.stopPropagation();
    toggleUsedItemPick({
      variables: {
        useditemId: item._id,
      },
    });
  };

  const onCompletedToggleUsedItemPick = () => {
    setIsLike((prev) => !prev);
  };

  const [toggleUsedItemPick] = useMutation(TOGGLE_USED_ITEM_PICK, {
    onCompleted: onCompletedToggleUsedItemPick,
  });

  return (
    <Container
      onClick={() => {
        getRouterBlock(`/brand/${item._id}`);
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
      <LikeButton onClick={onTogglePick}>
        {islike ? (
          <Image
            src="/images/icon-like-active.png"
            width={18}
            height={16}
            alt="image"
          />
        ) : (
          <Image
            src="/images/icon-like-light.png"
            width={18}
            height={16}
            alt="image"
          />
        )}
      </LikeButton>
      <Inner>
        <Row>
          <ItemTags>{item?.tags[0]}</ItemTags>
          <ItemPrice>{item?.price?.toLocaleString()}</ItemPrice>
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
  zIndex: 999,
  cursor: "pointer",
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
