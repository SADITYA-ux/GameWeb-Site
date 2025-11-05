import React from 'react';

export default function cart({cart , onRemove , onCheckout}) 
{
    const total = cart.reduce((s, i) => s + parseFloat(i.price),0);
    return (
               <div>
                <h2>Shopping Cart</h2>
                {cart.length === 0 ? <p>Your Cart is Empty</p> :
                <>
                <ul>
                    {cart.map((item , index) => (
                        <li key={index} style={{marginBottom: '10px'}}>                         // asign a unique key sabai item li
                            {gc.title} - Rs. {parseFloat(item.price).toFixed(2)}                // Minecraft - Rs. 10.00
                            <button onclick = {() => onRemove(item)} style={{marginLeft: '10px'}}>Remove</button>  // a button game ko side ma to remove game
                        </li>
                    ))}
                </ul>
                <p><strong>TOTAL : {total.toFixed(2)}</strong></p>
                <button onclick = {onCheckout}>Checkout (Simulation)</button>
                </>
                }
               </div>
    );
           
}