import { atom } from "recoil";

export const accessTokenState = atom({
  key: "accessToken",
  default: null,
});

export const userInfoState = atom({
  key: "userInfo",
  default: {
    userInfo: null,
  },
});
