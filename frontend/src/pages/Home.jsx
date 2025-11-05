import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <div className="hero card" style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 250 }}>
          <h1>GameZone — Play the Best</h1>
          <p className="small" style = {{fontSize : 20 , color : 'red',fontWeight : 'bold'}}>
            Sales and curated picks — styled like a jersey shop. Browse by category and add to cart.
          </p>
          <div style={{ marginTop: 12 }}>
            <Link to="/shop"><button>Shop Now</button></Link>
          </div>
        </div>

        <div style={{ width: 420, flexShrink: 0 }}>
          <img
            src="/images/banner.png"
            alt="banner"
            style={{ width: '100%', borderRadius: 8, objectFit: 'cover' }}
          />
        </div>
      </div>

      <section style={{ marginTop: 40 }}>
        <h3>Featured</h3>
        <div className="grid games" style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div className="card" style={{ padding: 12, flex: '1 1 220px' }}>
            <img src="/images/1.png" alt="f1" className='imge' />
            <h4>Most Played Game</h4>
            <p className="small">MINECRAFT</p>
            <button>View</button>
          </div>
          <div className="card" style={{ padding: 12, flex: '1 1 220px' }}>
            <img src="/images/2.jpg" alt="f2" className='imge' />
            <h4>Top Seller</h4>
            <p className="small">Must play</p>
            <button>View</button>
          </div>
          <div className="grid games" style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div className="card" style={{ padding: 12, flex: '1 1 220px' }}>
            <img src="/images/3.jpg" alt="f1" className='imge' />
            <h4>Horror Game</h4>
            <p className="small">Will get u to church</p>
            <button>View</button>
          </div>
        </div>
        </div>
      </section>
    </div>
  )
}
