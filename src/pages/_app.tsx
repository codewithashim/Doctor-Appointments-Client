import ReduxProvider from "@/Store/ReduxProvider";
import "@/Styles/globals.scss";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>
        <Component {...pageProps} />
      </ReduxProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
