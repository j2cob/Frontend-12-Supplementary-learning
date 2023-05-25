import styled from "@emotion/styled";
import Image from "next/image";

export default function Footer() {
  return (
    <Container>
      <Image
        src="/images/image-logo-footer.png"
        alt="logo"
        width={182}
        height={49}
      />
      <Inner>
        <p>
          (주) 딩코{" "}
          <span style={{ marginLeft: 88, display: "inline-block" }}>
            대표: 안우엽
          </span>
        </p>
        <p>사업자등록번호 717-87-02373</p>
        <p>주소: 서울특별시 구로구 디지털로 300, 패스트파이브</p>
        <p>학원 등록 번호: 제 5845호</p>
        <p>
          개인정보 처리방침
          <span style={{ marginLeft: 36, display: "inline-block" }}>
            서비스 이용 약관
          </span>
        </p>
        <p>Copyright © 2022. Dingco Corp., Ltd.</p>
      </Inner>
    </Container>
  );
}

const Container = styled.div({
  padding: "53px  107px",
  backgroundColor: "#F1F1F1  ",
  borderTop: "1px solid #555555",
  // position: "absolute",
  // bottom: 0,
  width: "100%",
  p: {
    fontSize: 14,
    letterSpacing: "-0.5px",
    marginTop: 12,
  },
});
const Inner = styled.div({
  padding: "0 20px",
  maxWidth: 1920,
  margin: "0 auto",
});
