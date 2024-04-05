'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import useCart from '@/hooks/useCart'

type UserInfo = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  address: any | null;
  birthday: any | null; // Assuming birthday is a Date object
  checkbox: any;
};

export default function CheckoutPage() {
  const q_cart = useCart()
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    address: null,
    birthday: null,
    checkbox: false
  });

  const [loading,setLoading] = useState(false);

  React.useEffect(() => {
    if (!q_cart?.data || !q_cart?.data?.checkoutUrl) {
      router.push('/')
    }
    console.log(q_cart?.data, 'here')
  }, [q_cart?.data])

  React.useEffect(() => {
    window.addEventListener('message', function (e) {
      if (e.data === 'GO_BACK') {
        router.back()
      }
    })

  }, [])

  async function onsubmitFn(e:any){
    e.preventDefault();
    setLoading(true)
    router.push(`https://test.payken.io/invoice/merchant_id=ad4a261048&merchant_secret=61d8368c78d98a4354c8d372?total=${q_cart?.data?.total}&type=purchase&display_name=${q_cart?.data?.venue?.name}&user_id=${userInfo?.email}&order_id=${q_cart?.data?.id}`)
  }

  return (
    <div className='checkout-section'>
      {/* <iframe
        // ref={iframeRef}

        src={q_cart?.data?.checkoutUrl}
        style={{ width: '100%', height: '100vh', border: 'none' }}
      /> */}

      <header className='checkout-header'>
        <h3>Checkout</h3>
      </header>
      <form onSubmit={onsubmitFn}>
        <main className='checkout-main'>

          <section className="checkout-form">
              <h6>Contact Info</h6>
              <div className='input-box'>

                <div className="form-control">
                  <label htmlFor="checkout-email">First Name</label>
                  <div>
                    <span className="fa fa-envelope"></span>
                    <input required onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })} type="text" id="checkout-email" name="checkout-email" />
                  </div>
                </div>
                <div className="form-control">
                  <label htmlFor="checkout-phone">Last Name</label>
                  <div>
                    <span className="fa fa-phone"></span>
                    <input required onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })} type="text" name="checkout-phone" id="checkout-phone" />
                  </div>
                </div>
              </div>
              <div className="form-control">
                <label htmlFor="checkout-phone">Email</label>
                <div>
                  <span className="fa fa-phone"></span>
                  <input required onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} type="email" name="checkout-phone" id="checkout-phone" />
                </div>
              </div>

              <div className="form-control">
                <label htmlFor="checkout-phone">Which state do you live in ?</label>
                <div>
                  <span className="fa fa-phone"></span>
                  <input required onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })} type="text" name="checkout-phone" id="checkout-phone" />
                </div>
              </div>

              <div className='input-box'>

                <div className="form-control">
                  <label htmlFor="checkout-email">Phone</label>
                  <div>
                    <span className="fa fa-envelope"></span>
                    <input required onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} type="tel" id="checkout-email" name="checkout-email" />
                  </div>
                </div>
                <div className="form-control">
                  <label htmlFor="checkout-phone">Birthday</label>
                  <div>
                    <span className="fa fa-phone"></span>
                    <input required onChange={(e) => setUserInfo({ ...userInfo, birthday: e.target.value })} type="date" name="checkout-phone" id="checkout-phone" />
                  </div>
                </div>
              </div>

              <br />
              <h6>Order Type</h6>
              <div className='radio-check'>

                <input checked type="radio" id="option1" name="option" value="option1" />
                <label htmlFor="option1">Delivery</label><br />
                {/* <input type="radio" id="option2" name="option" value="option2" />
                <label htmlFor="option2">In Store pick up</label><br /> */}
              </div>


              <div className="form-control">

                <label htmlFor="checkout-name">Full name</label>
                <div>
                  <span className="fa fa-user-circle"></span>
                  <input required type="text" id="checkout-name" name="checkout-name" />
                </div>
              </div>
              <div className="form-control">
                <label htmlFor="checkout-address">Address</label>
                <div>
                  <span className="fa fa-home"></span>
                  <input required type="text" name="checkout-address" id="checkout-address" />
                </div>
              </div>
              <div className="form-control">
                <label htmlFor="checkout-city">City</label>
                <div>
                  <span className="fa fa-building"></span>
                  <input required type="text" name="checkout-city" id="checkout-city" />
                </div>
              </div>
              <div className="form-group">
                <div className="form-control">
                  <label htmlFor="checkout-country">Country</label>
                  <div>
                    <span className="fa fa-globe"></span>
                    <input required type="text" name="checkout-country" id="checkout-country" list="country-list" />
                    <datalist id="country-list">
                      <option value="India"></option>
                      <option value="USA"></option>
                      <option value="Russia"></option>
                      <option value="Japan"></option>
                      <option value="Egypt"></option>
                    </datalist>
                  </div>
                </div>
                <div className="form-control">
                  <label htmlFor="checkout-postal">Postal code</label>
                  <div>
                    <span className="fa fa-archive"></span>
                    <input required  type="numeric" name="checkout-postal" id="checkout-postal" />
                  </div>
                </div>
              </div>

          </section>

          <section className="checkout-details">
            <div className="checkout-details-inner">

              <div className="checkout-shipping">
                <span>Subtotal</span>
                <p>${q_cart?.data?.subtotal}</p>
              </div>
              <div className="checkout-shipping">
                <span>Tax</span>
                <p>${q_cart?.data?.tax}</p>
              </div>
              <div className="checkout-total">
                <span>Total</span>
                <p>${q_cart?.data?.total}</p>
              </div>

              <div className='promo'>
                <input placeholder='Promo code' type='text' />
                <button>Apply</button>
              </div>

              <div className='checkbox'>
                <input required onChange={(e) => setUserInfo({ ...userInfo, checkbox: e.target.value })} type='checkbox' /> <span> By clicking checkbox you agree to the terms & conditions and our privacy policy and terms & conditions and consent to receiving text or email messages about your order.</span>
              </div>

              <div className="form-control-btn">
                <button type='submit'> {loading ? 'Loading...' : <>Checkout ${q_cart?.data?.total}</>}</button>
              </div>
              <div className="checkout-lists">
                {q_cart?.data?.items?.map((item, idx) => {
                  return (
                    <>
                      <div className="card">
                        <div className="card-image"><img src={item?.image} alt="" /></div>
                        <div className="card-details">
                          <div className="card-name">{item?.name}</div>
                          <div className='card-price'>
                            <span>QTY {item?.quantity}</span>
                            <span>${item?.price}</span>

                          </div>
                        </div>

                      </div>
                    </>
                  )
                })}


              </div>
            </div>


          </section>

        </main>

      </form>


    </div>


  )
}
