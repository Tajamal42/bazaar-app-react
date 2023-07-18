import React from 'react';
import { cartImg, logoDark, loginImg } from '../assets/index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const productData = useSelector((state) => state.bazar.productData);
  const userInfo = useSelector((state)=> state.bazar.userInfo);
  console.log(userInfo);
  return (
    <div className='w-full h-20 bg-white border-b-[1px] border-b-gray-800 sticky top-0 z-50'>
      <div className="max-w-screen-lg h-full mx-auto flex items-center justify-between">
          <Link to="/">
            <div>
              <h1>Bazaar</h1>
            </div>
          </Link>
        <div>
          
          <ul className='flex items-center gap-8'>
            <li className='text-base text-black font-bold hover:text-orange-900 
            hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300'>Home</li>
            <li>Pages</li>
            <li>Shop</li>
            <li>Element</li>
            <li>Blog</li>
            <li>
                <div className='relative'>
                  <Link to="/cart">
                  <img className='w-6' src={cartImg} alt='cartImg' />
                  <span className='absolute w-6 top-2 left-0 text-sm flex items-center justify-center font-semibold'>{productData.length}</span>
                  </Link>
                </div>
            </li>
            <li><Link to="/login"><img className='w-6' src={userInfo ? userInfo.image : loginImg} alt='loginImg' />Login</Link>{userInfo && <p>{userInfo.name}</p>}</li>
          </ul> 
      </div>
      </div>
    </div>
  )
}

export default Header