import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import { ToastContainer, toast } from 'react-toastify';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const Cart = () => {
  const productData = useSelector((state)=> state.bazar.productData);
  const userInfo = useSelector((state)=> state.bazar.userInfo);
  const [totalAmt, setTotalAmt] = useState("");
  const [payNow, setPayNow] = useState(false);
  useEffect(()=>{
    let price = 0;
    productData.map((item)=>{
      price += item.price * item.quantity;
      return price;
    })
    setTotalAmt(price.toFixed(2));
  }, [productData])
  const handleCheckout = () => {
    if(userInfo){
      setPayNow(true);
    } else {
      toast.error("Please Sign In to Checkout");
    }
  };
  const payment = async(token) => {
    await axios.post("http://localhost:8000/pay",{
      amount: totalAmt * 100,
      token: token
    });
  }
  return (
    <div className="max-w-screen-xl mx-auto py-20 flex">
      <CartItem />
      <div className="w-1/3 bg-[#fafafa] py-6 px-4">
        <div className='flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6'>
          <h2 className='text-2xl font-medium'>cart totals</h2>
          <p className="flex items-center gap-4 text-base">
            Subtotal{" "}
            <span className="font-bold text-lg">$ {totalAmt}</span>
          </p>
          <p className="flex items-center gap-4 text-base">
            Shipping{" "}
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mauris eros, fermentum in tristique nec, finibus quis arcu. Quisque ultrices id massa sit amet tincidunt.</span>
          </p>
          
        </div>
        <p className="font-semibold flex justify-between mt-6">
            Total: <span className="text-xl font-bold">${totalAmt}</span>
        </p>
        <button onClick={handleCheckout}>proceed to checkout</button>
        {
          payNow && (
          <div className="w-full mt-6 flex items-center justify-center">
            <StripeCheckout
              name="Bazar Online Shopping" // the pop-in header title
              description={`Your Payment amount is ${totalAmt}`} // the pop-in header subtitle
              image="https://www.vidhub.co/assets/logos/vidhub-icon-2e5c629f64ced5598a56387d4e3d0c7c.png" // the pop-in header image (default none)
              ComponentClass="div"
              panelLabel="Pay" // prepended to the amount in the bottom pay button
              amount={totalAmt * 100} // cents
              label="Pay to bazar"
              token={payment}
              currency="USD"
              stripeKey="pk_test_51NSw8lHTYM5VzzBTK7ZWedA9XF2ytwSjkGeUWM0FpgOV0WjXtMBIKinEMUu6IW1TMpbgTAaRTqttTWABs4AvUomn00iwiLIxgz"
              email={userInfo.email}
              >
          </StripeCheckout>
          </div>
        )}
      </div>
      <ToastContainer
            position="top-left"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        /> 
    </div>
  )
}

export default Cart