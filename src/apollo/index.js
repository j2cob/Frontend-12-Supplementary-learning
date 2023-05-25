import { authState } from "@/pages/atom";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  concat,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function ApolloSetting(props) {
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    if (localStorage.getItem("codebootcamp")) {
      setAuth({
        isLogged: true,
        token: localStorage.getItem("accessToken") || "",
      });
    }
  }, []);

  const uploadLink = createUploadLink({
    uri: "https://backend-practice.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${auth.token}` },
    credentials: "include",
  });

  const client = new ApolloClient({
    uri: "http://backend08.codebootcamp.co.kr/graphql",
    link: ApolloLink.from([uploadLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
