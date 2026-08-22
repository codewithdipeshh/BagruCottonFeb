import { Routes, Route } from 'react-router-dom';
import AdminRouter from './Routers/AdminRouter';

function App() {
  return (
    <Routes>
      {/* Admin panel accessible from both root and /admin paths */}
      <Route path="/admin/*" element={<AdminRouter />} />
      <Route path="/*" element={<AdminRouter />} />
    </Routes>
  );
}

export default App;