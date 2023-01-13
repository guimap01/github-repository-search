import { Route, Routes, Navigate } from 'react-router-dom';
import AppLayout from '../components/Layout';
import Home from '../pages/home';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
}
