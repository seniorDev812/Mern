import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import useUser from "./context/User/useUser";
import { Toaster } from "@/components/ui/toaster";
import Auth from "@/components/Auth";
import ProtectedComp from "@/components/ProtectedComp";
import PrivateRoute from "@/components/PrivateRoute";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  const { setUser } = useUser();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, [setUser]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Header />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<ProtectedComp />} />
        </Route>
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
