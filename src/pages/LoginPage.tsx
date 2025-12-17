import { useState } from 'react'

function LoginPage() {
  const [count, setCount] = useState(0)
  
  return (
    <div className="flex justify-center items-center bg-yellow-500 h-screen w-screen">

      <div className="bg-red-500 p-8 rounded-2xl flex flex-col">

        <div className="w-full flex items-center justify-center p-8">
          <h1 className="text-5xl">Login</h1>
        </div>

        <span className="text-2xl">Username</span>
        <input className="bg-white p-2 w-80"></input>
        <span className="text-2xl">Password</span>
        <input className="bg-white p-2 w-80"></input>
        <button className="bg-red-300 hover:bg-red-700 hover:cursor-pointer text-2xl p-1 mt-8">Login</button>
      </div>
    </div>
  )
}

export default LoginPage
