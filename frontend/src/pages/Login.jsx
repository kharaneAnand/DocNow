import React, { useContext, useEffect, useState } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const { backendUrl , token , setToken} = useContext(AppContext)
  const navigate = useNavigate()

  const [mode, setMode] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {

      if(mode == 'Sign Up'){

        const { data } = await axios.post(backendurl + '/api/user/register' , {name , password , email})
        if(data.success){
          localStorage.setItem('token' , data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      }else{

        const { data } = await axios.post(backendUrl + '/api/user/login' , { password , email})
        if(data.success){
          localStorage.setItem('token' , data.token)
          setToken(data.token)
          }
          else{
          toast.error(data.message)
          }
        }

     } catch (error) {
      
      toast.error(error.message)
      console.log(error);
    }
  };


  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 font-poppins">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8  border-2 rounded-2xl shadow-xl w-full max-w-md space-y-5"
      >
        <h2 className="text-3xl font-bold text-zinc-800 text-center">
          {mode === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-center text-zinc-500 text-sm">
          {mode === 'Sign Up' ? 'Join us to book your appointment' : 'Log in to continue'}
        </p>

        {mode === 'Sign Up' && (
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-zinc-400" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10 pr-3 py-2 w-full border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        )}

        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-zinc-400" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 pr-3 py-2 w-full border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div className="relative">
          <FaLock className="absolute left-3 top-3 text-zinc-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-3 py-2 w-full border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-blue-400 text-white font-semibold py-2 rounded-md transition-all duration-300"
        >
          {mode === 'Sign Up' ? 'Sign Up' : 'Login'}
        </button>

        <p className="text-center text-sm text-zinc-600">
          {mode === 'Sign Up' ? 'Already have an account?' : 'New here?'}{' '}
          <span
            className="text-primary underline cursor-pointer"
            onClick={() => setMode(mode === 'Sign Up' ? 'Login' : 'Sign Up')}
          >
            {mode === 'Sign Up' ? 'Login here' : 'Create an account'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
