import "../styles/globals.css";
import styled from "@emotion/styled";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { RecoilRoot } from "recoil";
import ApolloSetting from "@/src/apollo";

export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ApolloSetting>
        <Container>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </Container>
      </ApolloSetting>
    </RecoilRoot>
  );
}

const Container = styled.div({
  minHeight: "100vh",
  paddingTop: 216,
});
