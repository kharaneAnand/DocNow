import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (state === 'Admin') {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          toast.success('Admin logged in successfully!');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password });
        if (data.success) {
          localStorage.setItem('dToken', data.token);
          setDToken(data.token);
          toast.success('Doctor logged in successfully!');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchUser = (userType) => {
    setState(userType);
    setEmail('');
    setPassword('');
  };

  return (
    <form
      onSubmit={onsubmitHandler}
      className="min-h-[80vh] flex items-center justify-center bg-gradient-to-tr from-[#eef2f7] via-[#f0f7ff] to-[#dceeff]"
    >
      <div className="flex flex-col gap-5 m-auto items-start p-10 min-w-[340px] sm:min-w-96 border border-gray-200 rounded-3xl bg-white shadow-2xl text-[#374151] text-sm transition-all duration-300">
        <p className="text-3xl font-extrabold m-auto text-center tracking-wide">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p className="mb-1 font-semibold text-gray-700">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-gray-300 rounded-xl w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 shadow-sm"
            type="email"
            required
            disabled={loading}
          />
        </div>
        <div className="w-full">
          <p className="mb-1 font-semibold text-gray-700">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-gray-300 rounded-xl w-full p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 shadow-sm"
            type="password"
            required
            disabled={loading}
          />
        </div>
        <button
          disabled={loading}
          className="bg-primary hover:bg-primary/90 transition-all duration-300 text-white w-full py-3 rounded-xl text-base font-semibold shadow-lg"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {state === 'Admin' ? (
          <p className="text-center w-full font-medium text-gray-600">
            Doctor Login?{' '}
            <span
              className="text-primary font-semibold underline cursor-pointer hover:text-primary/80"
              onClick={() => switchUser('Doctor')}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-center w-full font-medium text-gray-600">
            Admin Login?{' '}
            <span
              className="text-primary font-semibold underline cursor-pointer hover:text-primary/80"
              onClick={() => switchUser('Admin')}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
