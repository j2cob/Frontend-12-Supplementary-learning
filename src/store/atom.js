import { atom } from "recoil";

export const accessTokenState = atom({
  key: "accessToken", // 전역적으로 고유한 값
  default: null,
});

export const userInfoState = atom({
  key: "userInfo", // 전역적으로 고유한 값
  default: {
    userInfo: null,
  },
});
