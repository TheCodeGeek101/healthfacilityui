import { DataProvider } from "@/context/DataContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
    <DataProvider>
    <Component {...pageProps} />;

    </DataProvider>

    </>

  );
  
}
