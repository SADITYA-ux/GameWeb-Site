import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from "./components/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import CartPage from "./pages/CartPage";
import Profile from "./pages/Profile";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import AdminDashboard from "./pages/AdminDashboard";
import { apiGet } from './api'

export default function App() {
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)
  const nav = useNavigate()

  // load session user on mount
  useEffect(() => {
    // simple endpoint to return session user; we can use /login.php with GET but we didn't create one.
    // Instead we can call a games endpoint that returns session via cookie? Simpler: create /whoami.php
    // But to keep it simple for now: recover user's data from localStorage (set at login/register)
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const handleLogin = (u) => {
    setUser(u)
    localStorage.setItem('user', JSON.stringify(u))
    nav('/profile')
  }

  const handleRegister = (u) => {
    setUser(u)
    localStorage.setItem('user', JSON.stringify(u))
    nav('/profile')
  }

  const handleLogout = async () => {
    // call backend logout to clear session cookie
    await fetch('http://localhost/backend/logout.php', { credentials: 'include' })
    setUser(null)
    localStorage.removeItem('user')
    nav('/')
  }

  const addToCart = (game) => setCart(prev => [...prev, game])

  return (
    <div>
      <Header cartCount={cart.length} user={user} onLogout={handleLogout} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop addToCart={addToCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterForm onRegister={handleRegister} />} />
          <Route path="/admin" element={<AdminDashboard user={user} />} />
        </Routes>
      </main>
    </div>
  )
}
