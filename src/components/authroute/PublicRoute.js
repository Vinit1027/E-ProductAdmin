import React from 'react'
import { useState } from 'react';
import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom";

const PublicRoute = ({children}) => {

    const [auth, setAuth] = useState({ admin : Cookies.get('admin')});

    console.log(auth.admin)
  return (
    <div>
        {
            auth.admin ? <Navigate to="/" /> : children
            //   !auth ? children : <Navigate to="/"/>
        }
    </div>
  )
}

export default PublicRoute