import React from 'react';
import {GoogleAuthProvider, getAuth, signInWithPopup, signOut} from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUser } from '../redux/bazarSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            dispatch(addUser({
                _id: user.uid,
                name: user.displayName,
                email: user.email,
                image: user.photoURL,

            }));
            setTimeout(()=>{
                navigate("/")
            },1500)
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            
        });
    };
    const handleSignOut = () => {
        signOut(auth).then(()=>{
            //sign out successfull
            toast.success("Log Out Successfully");
            dispatch(removeUser());
        }).catch((error)=> {
            console.log(error);
        })
      };
  return (
    <div className="w-full flex flex-col items-center justify-center gap-10 py-20">
        <div className="w-full flex flex-col items-center justify-center gap-10">
            <h2 onClick={handleGoogleLogin}>Login with Google</h2><button onClick={handleSignOut}>Sign Out</button>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-10">
            <h2>Login with Github</h2><button>Sign Out</button>
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

export default Login