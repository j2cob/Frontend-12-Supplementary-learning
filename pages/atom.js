import { atom } from "recoil";

export const accessTokenState = atom({
  key: "accessTokenState", // 전역적으로 고유한 값
  token: null,
});

export const userInfoState = atom({
  key: "userInfoState", // 전역적으로 고유한 값
  userInfo: null,
});
