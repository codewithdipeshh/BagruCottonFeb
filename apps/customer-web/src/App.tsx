import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProvider } from './context/AppContext';

import CustomersRouter from './Routers/CustomersRouter';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AppProvider>
        <Routes>
          <Route path="/*" element={<CustomersRouter />} />
        </Routes>
      </AppProvider>
    </GoogleOAuthProvider>
  );
}

export default App;