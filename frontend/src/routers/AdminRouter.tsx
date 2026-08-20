import { Route, Routes } from 'react-router-dom';
import Admin from '../AdminPanel/Admin'; 
import AdminLogin from '../AdminPanel/page/AdminLogin'; 
import ProtectedRoute from '../AdminPanel/components/ProtectedRoute';

const AdminRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Admin />} />
        <Route path="login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}></Route>
      </Routes>
    </div>
  );
};

export default AdminRouter;