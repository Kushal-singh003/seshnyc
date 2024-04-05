'use client'

import { useRouter,useSearchParams } from 'next/navigation'
import React from 'react'

export default function success() {
    const router = useRouter()
  
    return (
        <div style={{marginTop: '5%'}}>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{boxShadow: '2px 2px 4px #000000', textAlign: 'center', maxWidth: '1200px', padding: '70px'}}>
          <h2 style={{textAlign: 'center'}}>YOUR ORDER HAS BEEN COMPLETED</h2>
          <h3 style={{textAlign: 'center'}}>Thank you for your purchase</h3>
          
          {/* <p style={{textAlign: 'center'}}>Your order # is: {router?.query?.order_id}</p> */}
          <p style={{textAlign: 'center'}}>You will receive an order confirmation email with details of your order and a link to track your process.</p>
          <div style={{marginTop: '50px'}}>
            <a href="/" style={{display: 'inline-block', padding: '10px 20px', backgroundColor: '#FFA500', color: '#fff', textDecoration: 'none'}}>CONTINUE</a>
          </div>
        </div>
      </div>
    </div>
    )
}
