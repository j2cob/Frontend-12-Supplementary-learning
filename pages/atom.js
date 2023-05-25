import { atom } from "recoil";

export const authState = atom({
  key: "authState", // 전역적으로 고유한 값
  default: {
    isLogged: false,
    token: null,
  }, // 초깃값
});
