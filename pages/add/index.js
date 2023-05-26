import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import ImageUpload from "@/src/components/ImageUpload";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { CREATE_USED_ITEM } from "@/src/graphql/createUsedItem";
import { FETCH_USED_ITEM } from "@/src/graphql/fetchUsedItem";
import { UPDATE_USED_ITEM } from "@/src/graphql/updateUsedItem";
import Map from "@/src/components/Map";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

export default function Add() {
  const [isEdit, setIsEdit] = useState(false);
  const [contents, setContents] = useState("");
  const [images, setImages] = useState([]);
  const [useditemAddress, setUseditemAddress] = useState(null);
  const router = useRouter();

  const onCompleted = () => {
    alert(isEdit ? "수정이 완료 됬습니다." : "등록이 완료 됬습니다.");
    router.back();
  };

  const [createUsedItem] = useMutation(CREATE_USED_ITEM, {
    onCompleted,
  });
  const [updateUsedItem] = useMutation(UPDATE_USED_ITEM, {
    onCompleted,
  });
  const { register, handleSubmit, setValue, trigger } = useForm({
    mode: "onChange",
  });

  const onClickCancel = () => {
    router.back();
  };

  const onClickSubmit = async (data) => {
    const { name, remarks, contents, price, tags } = data;
    if (!(name && remarks && contents && price && tags)) {
      alert("필수 입력 사항입니다.");
      return;
    }
    const tagList = tags.split("#").filter((e) => e);
    const input = {
      name,
      remarks,
      contents,
      price: Number(price),
      tags: tagList,
      images,
      useditemAddress,
    };
    if (isEdit) {
      updateUsedItem({
        variables: {
          useditemId: router?.query?.id,
          updateUseditemInput: input,
        },
      });
    } else {
      createUsedItem({
        variables: {
          createUseditemInput: input,
        },
      });
    }
  };

  const onChangeContents = (value) => {
    setValue("contents", value === "<p><br></p>" ? "" : value);
    trigger("contents");
  };

  const onCompletedFetchUsedItem = (data) => {
    setValue("name", data.fetchUseditem?.name);
    setValue("remarks", data.fetchUseditem?.remarks);
    setValue("contents", data.fetchUseditem?.contents);
    setValue("price", data.fetchUseditem?.price);
    setValue("tags", data.fetchUseditem?.tags?.toString());
    setValue("images", data.fetchUseditem?.images);
    setImages(data.fetchUseditem?.images);
    setContents(data.fetchUseditem?.contents);
    trigger("contents");
  };

  const { refetch } = useQuery(FETCH_USED_ITEM, {
    skip: true,
    variables: {
      useditemId: router?.query?.id,
    },
    onCompleted: onCompletedFetchUsedItem,
  });

  const onChangeMap = (value) => {
    setUseditemAddress({ ...useditemAddress, ...value });
  };

  useEffect(() => {
    if (router.query?.id) {
      setIsEdit(true);
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

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
              defaultValue={contents}
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
        <Map onChange={onChangeMap} />
        <ImageUpload images={images} setImages={setImages} />
      </Form>
      <ButtonContainer>
        <Button onClick={onClickCancel}>취소</Button>
        <ButtonDark type="submit" onClick={handleSubmit(onClickSubmit)}>
          {isEdit ? "수정" : " 등록"}
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
const Row = styled.div({
  display: "flex",
  paddingBottom: 26,
  marginBottom: 26,
  borderBottom: "1px solid #999999",
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
