import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Sarees from './pages/Sarees';
import NewArrivals from './pages/NewArrivals';
import ReviewsPage from './pages/ReviewsPage';
import Blog from './pages/Blog';
import Privacy from "./pages/Privacy";
import TermsOfService from './pages/TermsofService';
import ExchangePolicy from './pages/Exchange';
import ShippingPolicy from './pages/Shipping';
import Login from './pages/login';
import Signup from './pages/SignUp';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <TopBar />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sarees" element={<Sarees />} />
            <Route path="/sarees/:category" element={<Sarees />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/exchange-policy" element={<ExchangePolicy />} />
            <Route path="/shipping" element={<ShippingPolicy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/SignUP" element={<Signup />} />
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
