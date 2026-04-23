import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Sarees from './pages/Sarees';
import NewArrivals from './pages/NewArrivals';
import TrackOrder from './pages/TrackOrder';
import ReviewsPage from './pages/ReviewsPage';
import Blog from './pages/Blog';

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
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
