import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import ImageUpload from "@/src/components/ImageUpload";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { CREATE_USED_ITEM } from "@/src/graphql/createUsedItem";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});
export default function Add() {
  const router = useRouter();

  const onCompletedCreateUsedItem = () => {
    //
  };
  const [createUsedItem] = useMutation(CREATE_USED_ITEM, {
    onCompleted: onCompletedCreateUsedItem,
  });
  const { register, handleSubmit, setValue, trigger } = useForm({
    mode: "onChange",
  });
  const [images, setImages] = useState([]);

  const onClickCancel = () => {
    router.back();
  };

  const onClickSubmit = async (data) => {
    const { name, remarks, contents, price, tags } = data;
    if (!(name && remarks && contents && price && tags)) {
      alert("필수 입력 사항입니다.");
      return;
    }
    createUsedItem({
      variables: {
        createUseditemInput: {
          name,
          remarks,
          contents,
          price: Number(price),
          tags,
          images,
        },
      },
    });
  };

  const onChangeContents = (value) => {
    setValue("contents", value === "<p><br></p>" ? "" : value);
    trigger("contents");
  };

  return (
    <Container>
      <Title>상품 등록</Title>
      <Form>
        <Row>
          <Label>상품명</Label>
          <input
            type="text"
            placeholder="상품명을 작성해주세요"
            {...register("name")}
          />
        </Row>
        <Row>
          <Label>상품 요약</Label>
          <input
            type="text"
            placeholder="상품 요약을 작성해주세요"
            {...register("remarks")}
          />
        </Row>

        <Row>
          <Label>상품 내용</Label>
          <Textarea>
            <ReactQuill
              placeholder="상품을 설명해주세요."
              onChange={onChangeContents}
            />
          </Textarea>
        </Row>
        <Row>
          <Label>판매 가격</Label>
          <input
            type="text"
            placeholder="판매 가격을 작성해주세요"
            {...register("price")}
          />
        </Row>
        <Row>
          <Label>태그 입력</Label>
          <input
            type="text"
            placeholder="#태그 #태그 #태그"
            {...register("tags")}
          />
        </Row>

        <div>
          <Label>브랜드 위치</Label>
          <MapRow>
            <Image
              className="icon"
              src="/images/image-map.png"
              width={384}
              height={252}
              alt="image"
            />
            <div style={{ width: "100%", marginLeft: 26 }}>
              <CodeInput
                placeholder="07250"
                type="text"
                {...register("address")}
              />
              <CodeButton>우편번호 검색</CodeButton>
              <InputWrap>
                <input type="text" />
                <input type="text" />
              </InputWrap>
            </div>
          </MapRow>
        </div>
        <ImageUpload images={images} setImages={setImages} />
      </Form>
      <ButtonContainer>
        <Button onClick={onClickCancel}>취소</Button>
        <ButtonDark type="submit" onClick={handleSubmit(onClickSubmit)}>
          등록
        </ButtonDark>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div({
  background: "#f5f5f5",
  padding: "104px 90px 113px",
});
const Title = styled.p({
  fontSize: 40,
  fontWeight: 700,
  opacity: 0.6,
  paddingBottom: 30,
  borderBottom: "3px solid #555",
});
const InputWrap = styled.div({
  marginTop: 26,
  input: {
    marginBottom: 24,
  },
});
const MapRow = styled.div({
  paddingBottom: 26,
  marginBottom: 26,
  marginTop: 38,
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid #999999",
});
const Row = styled.div({
  display: "flex",
  paddingBottom: 26,
  marginBottom: 26,
  borderBottom: "1px solid #999999",
});
const CodeButton = styled.button({
  marginLeft: 16,
  backgroundColor: "#000",
  color: "#fff",
  border: 0,
  width: 124,
  height: 52,
  cursor: "pointer",
  fontSize: 16,
  fontWeight: 500,
  opacity: 0.6,
});
const CodeInput = styled.input({
  "&&": {
    width: 77,
    height: 52,
    border: "1px solid #BDBDBD",
    background: "transparent",
    padding: 16,
  },
});
const Form = styled.div({
  margin: "41px 0 39px",
  input: {
    marginRight: 10,
    width: "100%",
    background: "#E9E9E9",
    height: 56,
    border: 0,
    padding: "0 18px",
    fontSize: 15,
    "&::placeholder": {
      color: "#A9A9A9      ",
    },
  },
});
const Textarea = styled.div({
  position: "relative",
  width: "100%",
  height: 430,
  ".quill": {
    background: "#fff",
    height: "100%",
    marginRight: 10,
    width: "100%",
    fontSize: 15,
    marginTop: -7,
    resize: "none",
    "&::placeholder": {
      color: "#BDBDBD      ",
    },
  },
  ".ql-container": {
    height: 390,
    border: "1px solid #BDBDBD",
  },
});
const Label = styled.p({
  fontSize: 24,
  width: 300,
  fontSize: 24,
  flex: "none",
  marginTop: 10,
});
const ButtonContainer = styled.div({
  marginTop: 68,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const Button = styled.button({
  width: 195,
  height: 77,
  marginLeft: 31,
  cursor: "pointer",
  fontSize: 20,
  fontWeight: 700,
  backgroundColor: "transparant",
  opacity: 0.6,
  border: "1px solid #000",
});
const ButtonDark = styled.button({
  backgroundColor: "#000",
  color: "#fff",
  width: 195,
  height: 77,
  marginLeft: 31,
  cursor: "pointer",
  fontSize: 20,
  fontWeight: 700,
  opacity: 0.6,
  border: 0,
});
