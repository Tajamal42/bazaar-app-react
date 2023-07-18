import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addToCart } from '../redux/bazarSlice';
import { ToastContainer, toast } from 'react-toastify';

const Product = () => {
    const dispatch = useDispatch();
    const [details, setDetails] = useState({});
    let [baseQty, setBaseQty] = useState(1);
    const location = useLocation();
    useEffect(() => {
        setDetails(location.state.item);
    },[location.state.item])
  return (
    <div>
        <div className="max-w-screen-xl mx-auto my-10 flex gap-10">
            <div>
                <img className="w-full h-[550px] object-cover" src={details.image} alt={details.image} />
            </div>
            <div className="w-3/5 flex flex-col justify-center gap-12">
            <div>
                <h2 className="font-semibold text-md">{details.title}</h2>
                <div className="flex items-center gap-4 mt-3">
                    <p className="line-through text-gray-500s">${details.oldPrice}</p>
                    <p className="font-semibold">${details.price}</p>
                </div>
            </div>
            <div>
              <p className="text-base text-gray-500 -mt-3">{details.description}</p>  
            </div>
            <div className="flex gap-4">
                <div className="w-52 flex items-center justify-between text-gray-500 gap-4 border p-3">
                    <p className='text-sm'>Quantity</p>
                    <div className='flex items-center gap-4 text-sm font-semibold'>
                        <button onClick={()=> setBaseQty(baseQty === 1 ? (baseQty = 1) : baseQty - 1)}>-</button>
                        <span>{baseQty}</span>
                        <button onClick={()=> setBaseQty(baseQty + 1)}>+</button>
                    </div>  
                </div>
                <button 
                    onClick={() => 
                        dispatch(
                            addToCart({
                                _id: details._id,
                                title: details.title,
                                image: details.image,
                                price: details.price,
                                quantity: baseQty,
                                description: details.description
                            })
                        ) & toast.success(`${details.title} is added`)
                    } 
                    className="bg-black text-white py-3 px-6 active:bg-gray-800">add to cart</button>
            </div>
            <p className='text-base text-gray-500'>Category: <span className="capitalize text-md">{details.category}</span></p>
        </div>
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

export default Product