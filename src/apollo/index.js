import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "../util/getAccessToken";
import { useRecoilState } from "recoil";
import { createUploadLink } from "apollo-upload-client";
import { accessTokenState, userInfoState } from "../store/atom";
import { useEffect } from "react";

export default function ApolloSetting(props) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  // if (!accessToken || !userInfo) return;

  // setUserInfo(JSON.parse(userInfo));

  // 리프레시 토큰 만료 에러 캐치 & 발급
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1-1. 에러를 캐치
    console.log(graphQLErrors);
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        // 1-2. 해당 에러가 토큰만료 에러인지 체크(UNAUTHENTICATED)
        if (err.extensions.code === "UNAUTHENTICATED") {
          // 2-1. refreshToken으로 accessToken을 재발급 받기
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              // 2-2. 재발급 받은 accessToken 저장하기
              setAccessToken(newAccessToken);
              console.log(newAccessToken);
              localStorage.setItem("accessToken", data?.loginUser.accessToken);
              // 3-1. 재발급 받은 accessToken으로 방금 실패한 쿼리 재요청하기
              operation.setContext({
                headers: {
                  ...operation.getContext().headers,
                  Authorization: `Bearer ${newAccessToken}`, // accessToken만 새걸로 바꿔치기
                },
              });
            })
          ).flatMap(() => forward(operation)); // 3-2. 변경된 operation 재요청하기!!!
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: "https://backend-practice.codebootcamp.co.kr/graphql",
    credentials: "include",
    headers: { Authorization: accessToken ? `Bearer ${accessToken}` : "" },
  });
  const client = new ApolloClient({
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setAccessToken(localStorage.getItem("accessToken") || "");
    }
    if (localStorage.getItem("email")) {
      setUserInfo(localStorage.getItem("email") || "");
    }
  }, []);

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
