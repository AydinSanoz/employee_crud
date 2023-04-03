import { SSRProvider } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { QueryClientProvider, QueryClient, Hydrate } from "react-query";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
    <>
      <SSRProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate>
            <Provider store={store}>
              <Layout>
                <Header />
                <Component {...pageProps} />
              </Layout>
            </Provider>
          </Hydrate>
        </QueryClientProvider>
      </SSRProvider>
    </>
  );
}
