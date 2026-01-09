import { useState , useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import './App.css'
import { Outlet, Route , Routes } from 'react-router'
import TasksPage from './pages/TasksPage'
import { Navigate } from 'react-router'

function ProtectedRoutes() {
  const [loggedIn,setLoggedIn] = useState(false);
  const [checking,setChecking] = useState(true);
  useEffect(()=>{
    console.log("App is Being Run m8");
    axios.get('http://localhost:5000/me',{withCredentials : true}).then(
      function(response){
        console.log("We Are Logged In");
        setLoggedIn(true);
        setChecking(false);
      }
    ).catch(
      function(error){
        console.log("Error");
        console.log(error);
        setLoggedIn(false);
      }
    ).finally(
      function(){
        console.log("Finally Me");
        if(checking == true){
          setChecking(false);
        }
      }
    )
  },[])
  if(checking) return <div>Loading</div>;
  if (!loggedIn) return <Navigate to="/login" replace />;
  return <Outlet />; // renders all child routes
}

function App() {
  const [count, setCount] = useState(0)
  


  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />}/>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoutes/>}>
        <Route path="/tasks" element={<TasksPage />} />
      </Route>
    </Routes>
  )
}

export default App
