import { Routes, Route } from 'react-router-dom';
import AdminRouter from './Routers/AdminRouter';

function App() {
  return (
    <Routes>
      <Route path="/*" element={<AdminRouter />} />
    </Routes>
  );
}

export default App;