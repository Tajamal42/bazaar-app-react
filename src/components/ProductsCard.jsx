import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/bazarSlice';
import { ToastContainer, toast } from 'react-toastify';

const ProductsCard = ({product}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const _id = product.title;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("")
  }
  const rootId = idString(_id);
  const handleDetails = () => {
    navigate(`/product/${rootId}`,{state: {item: product}})
  }
  
  return (
    <div className='group'>
      <div onClick={handleDetails} className="w-full h-96 cursor-pointer overflow-hidden">
        <img className="w-full h-full object-cover group-hover:scale-110 duration-500" src={product.image} alt={product.image} />
      </div>
      <div className="w-full border-[1px] px-2 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-titleFont font-bold text-sm">{product.title.substring(0,15)}</h2>
          </div>
          <div className="flex gap-2 overflow-hidden w-28 text-sm">
            <div className="flex gap-2 transform group-hover:translate-x-24">
              <p className="line-through text-gray-500s">${product.oldPrice}</p>
              <p className="font-semibold">${product.price}</p>
            </div>
          </div> 
        </div>
        <div className="flex items-center">
              <p className="font-semibold text-sm">
                Product Category: {product.category}
              </p>
        </div>
        <div className="flex items-center">
              <p 
                onClick={()=> 
                  dispatch(
                    addToCart({
                      _id: product.id,
                      title: product.title,
                      image: product.image,
                      price: product.price,
                      quantity: 1,
                      description: product.description,
                    })
                  ) & toast.success(`${product.title}  is added`)
                } className="w-[100px] font-semibold text-gray-500 hover:text-gray-900 flex-col gap-1 cursor-pointer">
                Add to Cart{" "}
              </p>
        </div>
        <div>{product.isNew && (<p>Sale</p>)}</div>
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

export default ProductsCard