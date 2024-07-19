import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewUser from "./components/ViewUser";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import DeleteUser from "./components/DeleteUser";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViewUser />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/edit/:id" element={<EditUser />} />
          <Route path="/delete/:id" element={<DeleteUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
