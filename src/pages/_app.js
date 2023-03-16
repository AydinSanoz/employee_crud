import Header from "@/components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Header></Header>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
