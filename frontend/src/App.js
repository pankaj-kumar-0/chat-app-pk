import React, { useState } from 'react';
import './Styles/App.css';
import Login from './Components/Login';
import ChatContainer from "./Components/ChatContainer";
import {BrowserRouter, Routes , Route} from "react-router-dom";



function App() {

  const [get_name, setget_name] = useState(""); //to get name from login page

  
  return (
    <>
    <section>
      <div className='bg-color' ></div>
      <div className='bg-color' ></div>
      <div className='bg-color' ></div>

      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login setget_name={setget_name} />} />  
      <Route path='/chat_container' element={<ChatContainer user_name={get_name} />} />  
      </Routes>
      </BrowserRouter>
      
    </section>
    </>
  );
}

export default App;

