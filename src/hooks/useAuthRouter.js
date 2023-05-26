import { useRouter } from "next/router";
import { accessTokenState } from "../store/atom";
import { useRecoilState } from "recoil";

export const useAuthRouter = (path) => {
  const [token, setToken] = useRecoilState(accessTokenState);
  const router = useRouter();

  const commonRoute = ["/", "/login"];
  const getRouterBlock = (path) => {
    if (!token && !commonRoute.includes(path)) {
      alert("로그인을 먼저 해주세요");
    } else {
      router.push(path);
    }
  };
  return { getRouterBlock };
};
