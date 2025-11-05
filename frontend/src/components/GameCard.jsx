// GameCard.jsx
import React from 'react'

export default function GameCard({ game, onAdd }) {
  return (
    <div style={card}>
      <img src={game.image ? `http://localhost/gamezone-backend/uploads/${game.image}` : 'https://via.placeholder.com/260x140'} alt={game.title} style={img} />
      <div style={{ padding: 8 }}>
        <h4 style={{ margin: '6px 0' }}>{game.title}</h4>
        <p style={{ margin: 0, fontSize: 13 }}>{game.category} • {game.platform}</p>
        <p style={{ marginTop: 8, marginBottom: 8 }}><strong>Rs. {parseFloat(game.price).toFixed(2)}</strong></p>
        <button onClick={() => onAdd(game)} style={addBtn}>Add to cart</button>
      </div>
    </div>
  )
}

const card = { width: 260, border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden', background: '#fff' }
const img = { width: '100%', height: 140, objectFit: 'cover' }
const addBtn = { padding: '8px 12px', cursor: 'pointer' }
