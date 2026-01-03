import { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router';
function RegisterPage() {
  const [count, setCount] = useState(0)
  
  const handleRegister = () => {
    console.log("Handling Login Click!");
    let usernameInput = document.getElementById("usernameInput") as HTMLInputElement;
    let passwordInput = document.getElementById("passwordInput") as HTMLInputElement;
    let username = usernameInput.value;
    let password = passwordInput.value;
    console.log("POSTING");
    axios.post('http://localhost:5000/register',{username:username , password:password})
    .then(function(response){
      //handle success
      console.log(response);
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
          <h1 className="text-5xl">Register</h1>
        </div>

        <span className="text-2xl">Username</span>
        <input id="usernameInput" className="bg-white p-2 w-80"></input>
        <span className="text-2xl">Password</span>
        <input type="password" id="passwordInput" className="bg-white p-2 w-80"></input>
        <button onClick={handleRegister}className="bg-red-300 hover:bg-red-700 hover:cursor-pointer text-2xl p-1 mt-8">Register</button>
        <div className="flex items-center flex-col m-2">
          <span>Already have an account, <Link className="text-blue-700 font-bold" to="/">Login</Link></span>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
