import React from 'react'
import Cart from '../components/Cart'

export default function CartPage({ cart, setCart }) {
  const remove = (idx) => setCart(prev => prev.filter((_,i)=>i!==idx))
  const checkout = () => {
    alert('Checkout simulated. Thank you!')
    setCart([])
  }

  return (
    <div>
      <h2>Cart</h2>
      <Cart cart={cart} onRemove={remove} onCheckout={checkout} />
    </div>
  )
}
