import { SSRProvider } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function App({ Component, pageProps }) {
  return (
    <>
      <SSRProvider>
        <Provider store={store}>
          <Layout>
            <Header />
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </SSRProvider>
    </>
  );
}
