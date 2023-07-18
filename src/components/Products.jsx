import React from 'react'
import ProductsCard from './ProductsCard'

const Products = ({products}) => {
  return (
    <div className="py-10">
        <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl bg-black text-white py-2 w-80 text-center">shopping everyday</h1>
            <p className='max-w-[700px] text-gray-600 text-center'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Maecenas eleifend a augue tristique convallis. Nulla sed libero 
                eget nulla accumsan ornare. Praesent ut facilisis elit. 
            </p>
        </div>
        <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-4 gap-10">
            {
                products.map((item)=>(
                    <ProductsCard key={item._id} product={item} />
                ))
            }
            
        </div>
    </div>
  )
}

export default Products