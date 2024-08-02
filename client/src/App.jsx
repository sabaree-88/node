import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Authprovider from "./Authprovider";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Authprovider />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
