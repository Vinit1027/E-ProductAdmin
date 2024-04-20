import React from 'react'
import { useState } from 'react';
import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const [auth, setAuth] = useState({ admin : localStorage.getItem('token')});

    console.log(auth.admin)
  return (
    <div>
        {
            auth.admin ? children: <Navigate to="/login" />
            //   !auth ? children : <Navigate to="/"/>
        }
    </div>
  )
}

export default ProtectedRoute