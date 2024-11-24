import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const signInWithEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/');
      console.log("Login successful!");
       // Navigate to home page on successful login
    }

    setLoading(false);
  };

  return (
    <div className="flex w-full h-screen">
      <div className="flex items-center justify-center w-full lg:w-full">
        <div className="">
          <div className="px-10 py-20 bg-white border-2 border-gray-200 rounded-3xl">
            <div className="flex items-center justify-center mb-8 text-4xl font-semibold">
              <h1>Login</h1>
            </div>
            <form onSubmit={signInWithEmail}>
              <div>
                <label className="text-lg font-medium">Email</label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="w-full p-4 mt-1 bg-transparent border-2 border-gray-100 rounded-xl"
                  placeholder="Enter your email"
                  name="Uemail"
                />
              </div>
              <div>
                <label className="text-lg font-medium">Password</label>
                <input
                  className="w-full p-4 mt-1 bg-transparent border-2 border-gray-100 rounded-xl"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              {error && (
                <div className="mt-2 text-red-500">{error}</div>
              )}
              <div className="flex justify-center mt-4 item-center">
                <div>
                  <button className="text-base font-medium text-red-500">Forgot password?</button>
                </div>
              </div>
              <div className="flex flex-col mt-4 gap-y-4">
                <button
                  type="submit"
                  className="font-bold text-white bg-red-500 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-2 rounded-xl text-lg"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                  
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
