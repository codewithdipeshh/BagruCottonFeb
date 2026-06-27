import { useEffect } from 'react'; // Added useEffect
import { useDispatch } from 'react-redux'; // Added Redux hooks
import { Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { getUser } from './State/Auth/Action'; 
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import About from './pages/About';
import Sarees from './pages/Sarees';
import NewArrivals from './pages/NewArrivals';
import ReviewsPage from './pages/ReviewsPage';
import Privacy from "./pages/Privacy";
import TermsOfService from './pages/TermsofService';
import ExchangePolicy from './pages/Exchange';
import ShippingPolicy from './pages/Shipping';
import Login from './pages/login';
import Signup from './pages/SignUp';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import AccountPlaceholder from './pages/AccountPlaceholder';


const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

function AppShell() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F4EE] text-[#3B2F2F] antialiased">
      <TopBar />
      <Navbar />
      <main className="flex-1 pt-28 lg:pt-32">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sarees" element={<Sarees />} />
            <Route path="/sarees/:category" element={<Sarees />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/exchange-policy" element={<ExchangePolicy />} />
            <Route path="/shipping" element={<ShippingPolicy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/SignUP" element={<Navigate to="/signup" replace />} />
            <Route path="/terms-of-service" element={<Navigate to="/terms" replace />} />
            <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<AccountPlaceholder title="Your Wishlist" description="Save sarees you love and shop them later." />} />
            <Route path="/profile" element={<AccountPlaceholder title="My Profile" description="Manage your account details and preferences." />} />
            <Route path="/orders" element={<AccountPlaceholder title="My Orders" description="Track shipments and view order history." />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
   
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </GoogleOAuthProvider>
  );
}

export default App;