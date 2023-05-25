import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import styled from "@emotion/styled";
import client from "../apollo";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <Container>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </Container>
      </ApolloProvider>
    </RecoilRoot>
  );
}

const Container = styled.div({
  minHeight: "100vh",
  paddingTop: 216,
});
