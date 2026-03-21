import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar   from './components/Navbar';
import Footer   from './components/Footer';
import Home     from './pages/Home';
import Catering from './pages/Catering';
import Rentals  from './pages/Rentals';
import Gallery  from './pages/Gallery';
import Contact  from './pages/Contact';
import Admin    from './pages/Admin';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

export default function App() {
  const location  = useLocation();
  const isAdmin   = location.pathname === '/admin';

  return (
    <CartProvider>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        {!isAdmin && <Navbar />}
        <main className="flex-1">
          <Routes>
            <Route path="/"         element={<Home />}     />
            <Route path="/catering" element={<Catering />} />
            <Route path="/rentals"  element={<Rentals />}  />
            <Route path="/gallery"  element={<Gallery />}  />
            <Route path="/contact"  element={<Contact />}  />
            <Route path="/admin"    element={<Admin />}    />
          </Routes>
        </main>
        {!isAdmin && <Footer />}
      </div>
    </CartProvider>
  );
}
