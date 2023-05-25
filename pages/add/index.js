import { images } from "@/next.config";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Add() {
  const fileRef = useRef(null);
  const [name, setName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [contents, setContents] = useState("");
  const [price, setPrice] = useState([""]);
  const [tags, setTags] = useState([""]);
  const [images, setImages] = useState([]);

  const onClickCancel = () => {
    //
  };

  const onClickConfirm = () => {
    //
  };

  const onClickUploadAdd = () => {
    if (fileRef.current) {
      fileRef.current?.click();
    }
  };

  const onClickDeleteImage = (index) => {
    const newImages = [...images].filter((e, i) => i !== index);
    setImages(newImages);
  };

  const onChangeFile = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        const newImages = [...images];
        newImages.push(reader.result);
        setImages(newImages);
        resolve();
      };
    });
  };

  return (
    <Container>
      <Title>상품 등록</Title>
      <Form>
        <Row>
          <Label>상품명</Label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="상품명을 작성해주세요"
            onChange={(e) => setName(e.target.value)}
          />
        </Row>
        <Row>
          <Label>상품 요약</Label>
          <input
            type="text"
            name="remarks"
            value={remarks}
            placeholder="상품요약을 작성해주세요"
            onChange={(e) => setRemarks(e.target.value)}
          />
        </Row>
        <Row>
          <Label>상품 내용</Label>
          <Textarea>
            <Image
              src="/images/image-editor.png"
              width={1920}
              height={35}
              alt="image"
            />
            <textarea
              name="contents"
              rows={10}
              value={contents}
              placeholder="상품을 설명해주세요."
              onChange={(e) => setContents(e.target.value)}
            />
          </Textarea>
        </Row>
        <Row>
          <Label>판매 가격</Label>
          <input
            type="text"
            name="price"
            value={price}
            placeholder="판매 가격을 입력해주세요"
            onChange={(e) => setPrice(e.target.value)}
          />
        </Row>
        <Row>
          <Label>태그 입력</Label>
          <input
            type="text"
            name="tags"
            value={tags}
            placeholder="#태그 #태그 #태그"
            onChange={(e) => setTags(e.target.value)}
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
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <CodeButton>우편번호 검색</CodeButton>
              <InputWrap>
                <input
                  type="text"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
                  type="text"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </InputWrap>
            </div>
          </MapRow>
        </div>
        <Row style={{ borderWidth: 3 }}>
          <div>
            <Label>사진 첨부</Label>

            <ImageRow>
              {images.map((image, index) => (
                <PreviewBox key={index}>
                  {image && (
                    <>
                      <button onClick={() => onClickDeleteImage(index)}>
                        <Image
                          className="icon"
                          src="/images/icon-delete.png"
                          width={14}
                          height={13}
                          alt="image"
                        />
                      </button>
                      <div className="preview">
                        <Image
                          width={14}
                          height={13}
                          className="preview-image"
                          src={image}
                          alt="preview-img"
                        />
                      </div>
                    </>
                  )}
                </PreviewBox>
              ))}
              <UploadInput onClick={onClickUploadAdd}>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    onChangeFile(e.target.files[0]);
                  }}
                />
                <Image
                  className="icon"
                  src="/images/icon-add.png"
                  width={14}
                  height={13}
                  alt="image"
                />
              </UploadInput>
            </ImageRow>
          </div>
        </Row>
      </Form>
      <ButtonContainer>
        <Button onClick={onClickCancel}>취소</Button>
        <ButtonDark onClick={onClickConfirm}>등록</ButtonDark>
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
const PreviewBox = styled.div({
  "&&": {
    marginRight: 24,
    width: 180,
    height: 180,
    position: "relative",
    overflow: "hidden",
    ".preview-image": {
      width: "100%",
      height: "100%",
    },
    button: {
      backgroundColor: "transparent",
      border: 0,
      position: "absolute",
      top: 13,
      right: 13,
      cursor: "pointer",
    },
  },
});
const UploadInput = styled.button({
  width: 180,
  height: 180,
  background: "#BDBDBD",
  position: "relative",
  overflow: "hidden",
  cursor: "pointer",
  border: 0,
  ".icon": {
    position: "absolute",
    top: "50%",
    left: "50%",
    margin: "0 -12px -12px",
  },
  input: {
    background: "transparent",
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: -"1px",
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    border: 0,
  },
});
const ImageRow = styled.div({
  display: "flex",
  alignItems: "center",
  margin: "50px 0",
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
  textarea: {
    marginRight: 10,
    width: "100%",
    background: "#fff",
    border: "1 solid #BDBDBD",
    padding: "18px",
    fontSize: 15,
    marginTop: -7,
    resize: "none",
    "&::placeholder": {
      color: "#BDBDBD      ",
    },
  },
});
const Textarea = styled.div({
  position: "relative",
  img: {
    width: "100%",
    height: "auto",
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
