import { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
function LoginPage() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();
  const handleLogin = () => {
    console.log("Handling Login Click!");
    let usernameInput = document.getElementById("usernameInput") as HTMLInputElement;
    let passwordInput = document.getElementById("passwordInput") as HTMLInputElement;
    let username = usernameInput.value;
    let password = passwordInput.value;
    console.log("POSTING");
    axios.post('http://localhost:5000/login',{username:username , password:password},{withCredentials : true})
    .then(function(response){
      console.log("Success");
      console.log(response.data.token);
      navigate('/tasks');
      console.log("Should Have Navigated ???");
    }).catch(function(error){
      //handle error
      console.log(error);
    }).finally(function(){
      //always executed
      console.log("Something?");
    })
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">

      <div className="bg-red-500 p-8 rounded-2xl flex flex-col">

        <div className="w-full flex items-center justify-center p-8">
          <h1 className="text-5xl">Login</h1>
        </div>
        <span className="text-2xl">Username</span>
        <input id="usernameInput" className="bg-white p-2 w-80"></input>
        <span className="text-2xl">Password</span>
        <input type="password" id="passwordInput" className="bg-white p-2 w-80"></input>
        <button onClick={handleLogin}className="bg-red-300 hover:bg-red-700 hover:cursor-pointer text-2xl p-1 mt-8">Login</button>
        
        <div className="flex items-center flex-col m-2">
          <span>Don't have an account, <Link className="text-blue-700 font-bold" to="/register">Register</Link></span>
        </div>
        
      </div>
    </div>
  )
}

export default LoginPage
