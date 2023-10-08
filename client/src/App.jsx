import { useState } from "react";
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Generatecertificate from "./pages/Generatecertificate";
import Navigation from "./components/Navigation";
import ValidateCertificate from "./pages/ValidateCertificate";
import Certificate from "./pages/Certificate";
import Wallet from "./pages/Wallet";
import "./App.css";
function App() {
  const [state,setState]=useState({web3:null,contract:null,account:null})
  
  const saveState=({web3,contract,account})=>{
    setState({web3:web3,contract:contract,account:account})
  }
  const router = createBrowserRouter([
    {path:'/',element:<Wallet saveState={saveState}/>},
    {path:'/Generate-Certificate',element:<Generatecertificate state={state}/>},
    {path:'/Validate-Certificate',element:<ValidateCertificate/>},
    {path:'/certificate',element:<Certificate/>},
  
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
