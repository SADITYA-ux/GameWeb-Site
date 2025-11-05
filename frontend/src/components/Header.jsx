import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({ cartCount, user, onLogout }) {
  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link to="/"><h2 style={{ margin: 0 }}>GameZone</h2></Link>
        <nav>
          <Link to="/shop">Shop</Link>
          <Link to="/shop?category=Sports">Sports</Link>
          <Link to="/shop?category=Action">Action</Link>
          <Link to="/shop?category=RPG">RPG</Link>
        </nav>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link to="/cart">Cart ({cartCount})</Link>
        {user ? (
          <>
            {user.role === 'admin' && <Link to="/admin">Manage</Link>}
            <Link to="/profile">{user.name}</Link>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  )
}
