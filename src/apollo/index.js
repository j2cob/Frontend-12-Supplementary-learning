import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  fromPromise,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "../util/getAccessToken";
import { useRecoilState } from "recoil";
import { createUploadLink } from "apollo-upload-client";
import { accessTokenState, userInfoState } from "../store/atom";
import { useEffect } from "react";
import { setContext } from "apollo-link-context";

export default function ApolloSetting(props) {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err.extensions.code === "UNAUTHENTICATED") {
          return fromPromise(
            getAccessToken().then((newAccessToken) => {
              setAccessToken(newAccessToken);
              localStorage.setItem("accessToken", newAccessToken);
              operation.setContext({
                headers: {
                  ...operation.getContext().headers,
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
            })
          ).flatMap(() => forward(operation));
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: "https://backend-practice.codebootcamp.co.kr/graphql",
    credentials: "include",
    headers: {
      Authorization:
        typeof window !== "undefined" && localStorage.getItem("accessToken")
          ? `Bearer ${localStorage.getItem("accessToken")}`
          : "",
    },
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("accessToken");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, uploadLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("accessToken")) {
        setAccessToken(localStorage.getItem("accessToken") || "");
      }
      if (
        localStorage.getItem("userInfo") &&
        localStorage.getItem("userInfo") !== undefined
      ) {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUserInfo(userInfo || "");
      }
    }
  }, []);

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
