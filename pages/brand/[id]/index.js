import styled from "@emotion/styled";
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import { FETCH_USED_ITEM } from "@/src/graphql/fetchUsedItem";
import { useRouter } from "next/router";
import { useState } from "react";
import DetailContent from "@/src/components/DetailContent";
import { DELETE_USED_ITEM } from "@/src/graphql/deleteUsedItem";
import { userInfoState } from "@/src/store/atom";
import { useRecoilValue } from "recoil";
import Questions from "@/src/components/Questions";

export default function BrandDetail() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const user = useRecoilValue(userInfoState);

  const onCompletedFetchUsedItem = (data) => {
    setData(data.fetchUseditem);
  };

  const onCompletedDeleteUsedItem = (data) => {
    alert("삭제되었습니다.");
    router.back();
  };

  const onClickEdit = () => {
    router.push({
      pathname: "/add",
      query: {
        id: router?.query?.id,
      },
    });
  };

  const onClickDelete = () => {
    deleteUsedItem({
      variables: {
        useditemId: router?.query?.id,
      },
    });
  };

  const [deleteUsedItem] = useMutation(DELETE_USED_ITEM, {
    onCompleted: onCompletedDeleteUsedItem,
  });

  useQuery(FETCH_USED_ITEM, {
    variables: {
      useditemId: router?.query?.id,
    },
    onCompleted: onCompletedFetchUsedItem,
  });

  const islike = true;
  return (
    <Container>
      <Row>
        <Image
          src={`https://storage.googleapis.com/${data?.images[0]}`}
          width={863}
          height={611}
          alt="image"
          style={{
            objectFit: "cover",
          }}
        />
        <Left>
          <Brand>AVANDRESS</Brand>
          <Name>{data?.name}</Name>
          {user === data?.seller?.email && (
            <EditButtonContainer>
              <button onClick={onClickEdit}>
                <Image
                  src="/images/icon-edit.png"
                  width={14}
                  height={14}
                  alt="image"
                />
              </button>
              <button style={{ marginLeft: 20 }} onClick={onClickDelete}>
                <Image
                  src="/images/icon-delete-light.png"
                  width={14}
                  height={14}
                  alt="image"
                />
              </button>
            </EditButtonContainer>
          )}
          <PriceContainer>
            <div>
              <span style={{ marginRight: 92 }}>판매가</span>
              <span>
                <b>{data?.price.toLocaleString()}</b>원
              </span>
            </div>
            <Row>
              <b>MY</b>
              <LikeButton>
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
              <b>Product</b>
            </Row>
          </PriceContainer>
          <Content>{data?.remarks}</Content>
          <Row>
            {data?.tags.map((tag, index) => (
              <Tag key={index}>#{tag}</Tag>
            ))}
          </Row>
          <ButtonContainer>
            <ButtonDark>BUY NOW</ButtonDark>
            <Button>SHOPPING BAG</Button>
          </ButtonContainer>
        </Left>
      </Row>
      <DetailContent contents={data?.contents} />

      {/* Questions */}
      <Questions useditemId={router?.query?.id} user={user} />
    </Container>
  );
}

const Container = styled.div({
  background: "#f5f5f5",
  minHeight: "100%",
  padding: "68px 57px",
});
const Row = styled.div({
  display: "flex",
  alignItems: "center",
});
const Brand = styled.p({
  fontSize: 12,
  opacity: 0.6,
});
const EditButtonContainer = styled.div({
  position: "absolute",
  right: 0,
  top: 0,
  button: {
    border: 0,
    background: "none",
    cursor: "pointer",
  },
});
const Left = styled.div({
  marginLeft: 56,
  position: "relative",
});
const Name = styled.p({
  marginTop: 9,
  fontSize: 40,
  fontWeight: 700,
  opacity: 0.6,
});
const PriceContainer = styled.div({
  display: "flex",
  alignItems: "center",
  marginTop: 95,
  paddingBottom: 20,
  borderBottom: "3px solid #555555",
  justifyContent: "space-between",
  p: {
    opacity: 0.6,
  },
  b: {
    opacity: 0.6,
  },
});
const LikeButton = styled.button({
  margin: "0 10px",
  cursor: "pointer",
  border: 0,
  padding: 0,
});
const Content = styled.p({
  padding: 22,
  fontSize: 20,
  opacity: 0.6,
});
const Tag = styled.p({
  marginTop: 8,
  fontSize: 16,
  paddingLeft: 5,
  color: "#F65656",
});
const ButtonContainer = styled.div({
  borderTop: "1px solid #C0C0C0",
  paddingTop: 30,
  marginTop: 14,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const Button = styled.button({
  width: 436,
  height: 100,
  marginLeft: 19,
  cursor: "pointer",
  fontSize: 30,
  fontWeight: 400,
  opacity: 0.6,
  backgroundColor: "#000",
  color: "#fff",
  border: 0,
});
const ButtonDark = styled.button({
  backgroundColor: "#000",
  color: "#fff",
  width: 309,
  height: 100,
  marginLeft: 31,
  cursor: "pointer",
  fontSize: 30,
  fontWeight: 400,
  border: 0,
});
