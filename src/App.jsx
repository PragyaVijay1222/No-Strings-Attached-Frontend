import './App.css';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/home/HomePage';
import { Men } from './components/men/Men';
import { Women } from './components/women/Women';
import { Accessories } from './components/accessories/Accessories';
import { Bag } from './components/bag/Bag';
import { Favorites } from './components/favorites/Favorites';
import { Sell } from './components/sell/Sell';
import { Donate } from './components/donate/Donate';
import { Profile } from './components/profile/Profile';
import { Blog } from './components/blog/Blog';
import { ChatPage } from './components/chat/ChatPage';
import { Signup } from './components/signup/Signup';
import { Login } from './components/login/Login';
import { Product } from './components/common/Product';
import { ProtectedRoute } from './components/common/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/women" element={<ProtectedRoute><Women /></ProtectedRoute>} />
      <Route path="/men" element={<ProtectedRoute><Men /></ProtectedRoute>} />
      <Route path="/accessories" element={<ProtectedRoute><Accessories /></ProtectedRoute>} />
      <Route path="/bag" element={<ProtectedRoute><Bag /></ProtectedRoute>} />
      <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
      <Route path="/chat/:productId/:userId/:sellerId" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
      <Route path="/sell" element={<ProtectedRoute><Sell /></ProtectedRoute>} />
      <Route path="/donate" element={<ProtectedRoute><Donate /></ProtectedRoute>} />
      <Route path="/blog" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
      <Route path="/product/:id" element={<ProtectedRoute><Product /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;