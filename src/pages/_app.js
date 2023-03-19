import Header from "@/components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { SSRProvider } from "react-bootstrap";

export default function App({ Component, pageProps }) {
  return (
    <>
      <SSRProvider>
        <Layout>
          <Header></Header>
          <Component {...pageProps} />
        </Layout>
      </SSRProvider>
    </>
  );
}
