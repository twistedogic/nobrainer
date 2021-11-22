import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { analytics } from "../firebase/client";
import { Provider } from "../components/context/AppContext";

const App = ({ Component, pageProps }: AppProps) => {
  const routers = useRouter();
  useEffect(() => {
    if (!analytics) {
      const logEvent = (url) => {
        analytics().setCurrentScreen(url);
        analytics().logEvent("screen_view");
      };
      routers.events.on("routeChangeComplete", logEvent);
      //For First Page
      logEvent(window.location.pathname);
      //Remvove Event Listener after un-mount
      return () => {
        routers.events.off("routeChangeComplete", logEvent);
      };
    }
  }, []);
  return (
    <>
      <Provider>
        <Component {...pageProps} />
      </Provider>
      <ToastContainer />
    </>
  );
};

export default App;
