import styled from "@emotion/styled";
import Image from "next/image";

export default function DetailContent() {
  return (
    <DetailContainer>
      <ContentTitle>DETAIL</ContentTitle>
      asdas
      <p className="caution">배송/교환/반품/AS 관련 유의사항</p>
      <p className="caution-desc">
        상품상세설명에 배송/교환/반품/취소 관련 안내가 기재된 경우 다음
        안내사항보다 우선 적용됩니다.
      </p>
      <Image
        className="image-map"
        src="/images/image-map-lg.png"
        width={1000}
        height={791}
        alt="image"
      />
      <p className="description">
        ·상품별로 상품 특성 및 배송지에 따라 배송유형 및 소요기간이 달라집니다.
        <br />· 상품의 배송비는 공급업체의 정책에 따라 다르오며 공휴일 및 휴일은
        배송이 불가합니다. <br />·
        <b>
          상품하자 이외 사이즈, 색상교환 등 단순 변심에 의한 교환/반품 택배비
          고객부담으로 왕복택배비가 발생합니다. <br /> &nbsp;&nbsp;(전자상거래
          등에서의 소비자보호에 관한 법률 제18조(청약 철회 등) 9항에 의거
          소비자의 사정에 의한 청약 철회 시 택배비는 소비자 부담입니다.)
        </b>
        <br />
        ·주문완료 후 재고 부족 등으로 인해 주문 취소 처리가 될 수도 있는 점 양해
        부탁드립니다. 반품/교환은 미사용 제품에 한해 배송완료 후 7일 이내에
        접수하여 주십시오.
        <br /> &nbsp;&nbsp;제품을 사용 또는 훼손한 경우, 사은품 누락, 상품 TAG
        보증서, 상품 부자재가 제거 혹은 분실된 경우, 밀봉포장을 개봉했거나 내부
        포장재를 훼손 또는 분실한 경우&nbsp;(단, 제품확인을 위한 개봉 제외)
        반품/교환이 불가합니다.
        <br />· A/S 기준이나 가능여부는 브랜드와 상품에 따라 다르므로 관련
        문의는 에이블리 고객센터를 통해 부탁드립니다. <br />· 상품불량에 의한
        반품,교환, A/S, 환불, 품질보증 및 피해보상 등에 관한 사항은
        소비자분쟁해결기준(공정거래위원회 고시)에 따라 받으실 수 있습니다.
      </p>
    </DetailContainer>
  );
}

const DetailContainer = styled.div({
  marginTop: 170,
  opacity: 0.6,
  ".caution": {
    fontWeight: 700,
    fontSize: 32,
    marginTop: 96,
  },
  ".caution-desc": {
    marginTop: 19,
    fontSize: 24,
  },
  ".image-map": {
    marginTop: 10,
    width: "100%",
    height: "auto",
  },
  ".description": {
    marginTop: 33,
    fontSize: 24,
    lineHeight: "35px",
  },
});
const ContentTitle = styled.p({
  fontWeight: 700,
  fontSize: 32,
  borderBottom: "3px solid #555",
  paddingBottom: 20,
  marginBottom: 105,
});
