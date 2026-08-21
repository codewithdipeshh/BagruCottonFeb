import { Route, Routes } from 'react-router-dom';
import Admin from '../components/Admin'; 
import AdminLogin from '../pages/AdminLogin'; 
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import ProtectedRoute from '../components/ProtectedRoute';

const AdminRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/*" element={<Admin />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AdminRouter;