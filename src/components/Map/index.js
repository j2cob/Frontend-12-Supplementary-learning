import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

export default function Map({ onChange }) {
  const [isShow, setIsShow] = useState(false);
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
    onChange({ address });
  };
  const onChangeZipcode = (e) => {
    setZipcode(e.target.value);
    onChange({ zipcode });
  };

  const onChangeAddressDetail = (e) => {
    setAddressDetail(e.target.value);
    onChange({ addressDetail });
  };

  return (
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
            value={zipcode}
            onChange={onChangeZipcode}
            placeholder="07250"
            type="text"
          />
          <CodeButton onClick={() => setIsShow((prev) => !prev)}>
            우편번호 검색
          </CodeButton>
          <InputWrap>
            <input value={address} onChange={onChangeAddress} type="text" />
            <input
              type="text"
              value={addressDetail}
              onChange={onChangeAddressDetail}
            />
          </InputWrap>
        </div>
      </MapRow>
      {/* {isShow && Postcode()} */}
    </div>
  );
}

const Label = styled.p({
  fontSize: 24,
  width: 300,
  fontSize: 24,
  flex: "none",
  marginTop: 10,
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
