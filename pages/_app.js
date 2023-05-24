import "@/styles/globals.css";
import styled from "@emotion/styled";

export default function App({ Component, pageProps }) {
  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  );
}

const Container = styled.div({
  minHeight: "100vh",
});
