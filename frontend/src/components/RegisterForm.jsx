// RegisterForm.jsx
import React, { useState } from 'react'
import { apiPost } from '../api'
import { useNavigate } from 'react-router-dom'

export default function RegisterForm({ onRegister }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(null)
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setErr(null)
    const res = await apiPost('register.php', { name, email, password })
    if (res && res.success) {
      onRegister(res.user)
      localStorage.setItem('user', JSON.stringify(res.user))
      nav('/profile')
    } else {
      setErr(res.error || 'Registration failed')
    }
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 420 }}>
      <h3>Register</h3>
      {err && <p style={{ color: 'red' }}>{err}</p>}
      <div>
        <label>Name</label><br />
        <input value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email</label><br />
        <input value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password</label><br />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <button type="submit" style={{ marginTop: 8 }}>Register</button>
    </form>
  )
}
