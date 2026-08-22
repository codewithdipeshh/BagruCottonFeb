import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppProvider } from './context/AppContext';
import { getUser } from './State/Auth/Action';
import CustomersRouter from './Routers/CustomersRouter';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

function App() {
  const dispatch = useDispatch<any>();

  
  useEffect(() => {
    const userToken = localStorage.getItem('jwt');

    if (userToken) {
      dispatch(getUser(userToken));
    }
  }, [dispatch]);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AppProvider>
        <Routes>
          {/* Main Customer Website */}
          <Route path="/*" element={<CustomersRouter />} />
        </Routes>
      </AppProvider>
    </GoogleOAuthProvider>
  );
}

export default App;