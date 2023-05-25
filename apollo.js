import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  concat,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: "http://backend-practice.codebootcamp.co.kr/graphql",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const userLogin = localStorage.getItem("codebootcamp");
  const auth = JSON.parse(userLogin);
  operation.setContext({
    headers: {
      Accept: "charset=utf-8",
      Authorization: `Bearer ${auth?.token}`,
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

export default client;
