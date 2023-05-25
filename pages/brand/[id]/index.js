import styled from "@emotion/styled";
import Image from "next/image";
import DetailContent from "./DetailContent";
import Comment from "./Comment";

export default function BrandDetail() {
  const islike = true;
  return (
    <Container>
      <Row>
        <Image
          src="http://placehold.it/600x400"
          width={863}
          height={611}
          alt="image"
        />
        <Left>
          <Brand>AVANDRESS</Brand>
          <Name>[SET] HERO TRACK WIDE SET-UP PURPLE</Name>
          <EditButtonContainer>
            <button>
              <Image
                src="/images/icon-edit.png"
                width={14}
                height={14}
                alt="image"
              />
            </button>
            <button style={{ marginLeft: 20 }}>
              <Image
                src="/images/icon-delete-light.png"
                width={14}
                height={14}
                alt="image"
              />
            </button>
          </EditButtonContainer>
          <PriceContainer>
            <div>
              <p style={{ marginRight: 92 }}>판매가</p>
              <p>
                <b>153,900</b>원
              </p>
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
          <Content>
            폴리에스테르 100% 원사로 스퀘어미터 450 밀도있게 편직하여 중량감과
            두께를 트레이닝복에 최적화시켰으며 덤블텐타가공으로 축율 및 뒤틀림을
            최소화 하였습니다. 수분을 빠르게 흡수하고 건조되도록 하였고
            내마모성이 좋습니다. 기계세탁이 가능하며 세탁 후 빠르게 건조되어
            관리가 용이합니다. 편직 가공에서 유연제 처리로 부드러운 터치감으로
            편안합니다.
          </Content>
          <Tag>#트랙자켓 #아우터 #자켓</Tag>
          <ButtonContainer>
            <ButtonDark>BUY NOW</ButtonDark>
            <Button>SHOPPING BAG</Button>
          </ButtonContainer>
        </Left>
      </Row>
      <DetailContent />
      <Comment />
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
  paddingLeft: 22,
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
