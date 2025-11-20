import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import App from "./App";
import AdminUpload from "./pages/AdminUpload";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/admin/upload"
          element={<ProtectedRoute><AdminUpload /></ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}
