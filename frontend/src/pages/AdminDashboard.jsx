import React, { useEffect, useState } from 'react'
import { apiGet, apiPost, apiUploadImage } from '../api'
import GameCard from '../components/GameCard'

export default function AdminDashboard({ user }) {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // game object if editing
  const [form, setForm] = useState({ title:'', description:'', price:'', category:'', platform:'', image:'' })
  const [message, setMessage] = useState('')

  useEffect(()=> { loadGames() }, [])

  const loadGames = async () => {
    setLoading(true)
    const res = await apiGet('games.php')
    setGames(res.games || [])
    setLoading(false)
  }

  if (!user || user.role !== 'admin') {
    return <div style={{ padding: 20 }}><h3>Access denied — Admins only</h3></div>
  }

  const startEdit = (g) => {
    setEditing(g)
    setForm({ title: g.title, description: g.description, price: g.price, category: g.category, platform: g.platform, image: g.image })
  }

  const clearForm = () => {
    setEditing(null)
    setForm({ title:'', description:'', price:'', category:'', platform:'', image:'' })
    setMessage('')
  }

  const submit = async (e) => {
    e.preventDefault()
    setMessage('')
    if (editing) {
      const res = await apiPost('update_game.php', { id: editing.id, ...form })
      if (res.success) { setMessage('Updated'); loadGames(); clearForm() } else setMessage(res.error)
    } else {
      const res = await apiPost('add_game.php', form)
      if (res.success) { setMessage('Added'); loadGames(); clearForm() } else setMessage(res.error)
    }
  }

  const remove = async (g) => {
    if (!confirm(`Delete ${g.title}?`)) return
    const res = await apiPost('delete_game.php', { id: g.id })
    if (res.success) loadGames()
  }

  const onFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const res = await apiUploadImage(file)
    if (res.success) {
      setForm(prev => ({ ...prev, image: res.filename }))
      setMessage('Image uploaded')
    } else {
      setMessage(res.error || 'Upload failed')
    }
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <form onSubmit={submit} className="card" style={{ padding: 12 }}>
            <h4>{editing ? 'Edit Game' : 'Add Game'}</h4>
            <div><label>Title</label><input value={form.title} onChange={e=>setForm({...form, title: e.target.value})} required /></div>
            <div><label>Price</label><input type="number" step="0.01" value={form.price} onChange={e=>setForm({...form, price: e.target.value})} required /></div>
            <div><label>Category</label><input value={form.category} onChange={e=>setForm({...form, category: e.target.value})} /></div>
            <div><label>Platform</label><input value={form.platform} onChange={e=>setForm({...form, platform: e.target.value})} /></div>
            <div><label>Image (upload)</label><input type="file" onChange={onFile} /></div>
            <div><label>Image filename</label><input value={form.image} onChange={e=>setForm({...form, image: e.target.value})} /></div>
            <div><label>Description</label><textarea value={form.description} onChange={e=>setForm({...form, description: e.target.value})}></textarea></div>
            <div style={{ marginTop: 8 }}>
              <button type="submit">{editing ? 'Update' : 'Add Game'}</button>
              <button type="button" onClick={clearForm} style={{ marginLeft: 8, background:'#6b7280' }}>Clear</button>
            </div>
            {message && <p style={{ marginTop: 8 }}>{message}</p>}
          </form>
        </div>

        <div style={{ flex: 2 }}>
          <h4>Existing Games</h4>
          {loading ? <p>Loading...</p> : (
            <div className="grid games">
              {games.map(g => (
                <GameCard key={g.id} game={g} onAdd={()=>{}} onEdit={()=>startEdit(g)} onDelete={()=>remove(g)} isAdmin={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
