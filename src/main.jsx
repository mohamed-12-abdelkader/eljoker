import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Nav from "./components/navbar/Navbar.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "./components/Footer/Footer.jsx";
import "react-toastify/dist/ReactToastify.css";
import WhatsButton from "./components/whatsButton/WhatsButton.jsx";
import SidebarWithHeader from "./components/navbar/Navbar.jsx";

// إنشاء QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const Root = () => {
  useEffect(() => {
    const overlay = document.getElementById("overlay");

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        overlay.style.display = "block";
      } else {
        overlay.style.display = "none";
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <React.StrictMode>
      <div id="overlay" className="overlay"></div>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Router>
            <SidebarWithHeader />
            <App />
            <WhatsButton />
            <Footer />
          </Router>
        </ChakraProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
