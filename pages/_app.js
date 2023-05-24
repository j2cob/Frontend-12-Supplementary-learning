import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import "@/styles/globals.css";
import styled from "@emotion/styled";

export default function App({ Component, pageProps }) {
  return (
    <Container>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Container>
  );
}

const Container = styled.div({
  minHeight: "100vh",
  paddingBottom: 358,
  paddingTop: 216,
});
