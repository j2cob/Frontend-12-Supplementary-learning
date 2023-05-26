import styled from "@emotion/styled";
import Image from "next/image";

export default function QuestionButtons({ onClickEdit, onClickDelete }) {
  return (
    <Container>
      <button onClick={onClickEdit} style={{ marginLeft: 30 }}>
        <Image src="/images/icon-edit.png" width={14} height={13} alt="image" />
      </button>
      <button style={{ marginLeft: 10 }} onClick={onClickDelete}>
        <Image
          src="/images/icon-delete-light.png"
          width={14}
          height={13}
          alt="image"
        />
      </button>
    </Container>
  );
}

const Container = styled.div({
  button: {
    background: "transparent",
  },
});
