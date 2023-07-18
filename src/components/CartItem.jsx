import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, deleteItem, incrementQuantity, resetCart } from '../redux/bazarSlice';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const CartItem = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.bazar.productData);
  return (
    <div className="w-2/3 pr-10">
        <div className="w-full">
            <h2 className="text-2xl">shopping cart</h2>
        </div>
        <div>
            {
                productData.map((item) => (
                    <div key={item._id} className="flex items-center justify-between gap-6 mt-6">
                        <div className="text-sm font-semibold cursor-pointer" onClick={()=> dispatch(deleteItem(item._id))&toast.error(`${item.title} is removed`)}>X</div>
                        <div>
                            <img className="w-32 h-32 object-cover" src={item.image} alt='productImg' />
                        </div>
                        <h2 className='w-52'>{item.title}</h2>
                        <p className='w-10'>${item.price}</p>
                        <p className='text-sm'>Quantity</p>
                        <div className="flex items-center gap-4 text-sm font-semibold">
                            <div className='flex items-center gap-4 text-sm font-semibold'>
                                <button onClick={() => 
                        dispatch(
                            decrementQuantity({
                                _id: item._id,
                                title: item.title,
                                image: item.image,
                                price: item.price,
                                quantity: 1,
                                description: item.description
                            })
                        )}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => 
                        dispatch(
                            incrementQuantity({
                                _id: item._id,
                                title: item.title,
                                image: item.image,
                                price: item.price,
                                quantity: 1,
                                description: item.description
                            })
                        )}>+</button>
                            </div>  
                        </div>
                        <p className='w-14'>${item.quantity * item.price}</p>
                    </div>
                ))
            }  
        </div>
        <button onClick={() => dispatch(resetCart()) & toast.error("Your Cart is empty!")} className="bg-red-500 text-white mt-8 ml-7 py-1 px-6 hover:bg-red-800 duration-300">Reset Cart</button>
        <div>
            <Link to="/">
                <span>go back to shopping</span>
            </Link>
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

export default CartItem