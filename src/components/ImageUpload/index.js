import { UPLOAD_FILE } from "@/pages/graphql/uploadFile";
import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRef } from "react";

export default function ImageUpload({ images, setImages }) {
  const fileRef = useRef(null);
  const onClickUploadAdd = () => {
    if (fileRef.current) {
      fileRef.current?.click();
    }
  };

  const onClickDeleteImage = (index) => {
    const newImages = [...images].filter((e, i) => i !== index);
    setImages(newImages);
  };
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const onChangeFile = async (file) => {
    const result = await uploadFile({ variables: { file } });
    const newImages = [...images];
    newImages.push(result.data?.uploadFile.url ?? "");
    setImages(newImages);
  };

  return (
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
                      src={`https://storage.googleapis.com/${image}`}
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
  );
}

const Label = styled.p({
  fontSize: 24,
  width: 300,
  fontSize: 24,
  flex: "none",
  marginTop: 10,
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
const Row = styled.div({
  display: "flex",
  paddingBottom: 26,
  marginBottom: 26,
  borderBottom: "1px solid #999999",
});
const ImageRow = styled.div({
  display: "flex",
  alignItems: "center",
  margin: "50px 0",
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
