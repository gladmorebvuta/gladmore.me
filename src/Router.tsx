import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import App from "./App";
import AdminUpload from "./pages/AdminUpload";
import { ResumePage } from "./pages/ResumePage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/admin/upload"
          element={<ProtectedRoute><AdminUpload /></ProtectedRoute>}
        />
        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </BrowserRouter>
  );
}
