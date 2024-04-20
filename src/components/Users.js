import React from 'react'
import axios from 'axios';
import { useEffect,useState } from 'react';
import Container from '@mui/material/Container';


const Users = () => {

  const [data, setData] = useState([]);

  const FetchUserData = async ()=> {

    await axios.get('https://e-products-api.onrender.com/apiv1/user/get-users',
    {
      headers: {
        'Content-Type' : 'multipart/form-data',
      }
    },{
      withCredentials:true,
      credentials: "include"
    })
    .then(response => response)
    .then(data => setData(data.data.data))
  }

  console.log(data)

  useEffect(()=> {

    FetchUserData();
  },[])



  return (
    <div>
      <Container>
        <table className='cattable'>
          <thead>
            <tr className='cellhead'>
              <th className='cellbox'>ID</th>
              <th className='cellbox'>Name</th>
              <th className='cellbox'>Email</th>
              <th className='cellbox'>Password</th>
              <th className='cellbox'>Contact</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((ele)=> {

                return(

                  <tr key={ele._id}>
                    <td className='cellbox2'>{ele._id}</td>
                    <td className='cellbox2'>{ele.name}</td>
                    <td className='cellbox2'>{ele.email}</td>
                    <td className='cellbox2'>{ele.password}</td>
                    <td className='cellbox2'>{ele.contact}</td>
                  </tr>
                )

              })
            }
          </tbody>
        </table>   
      </Container>
    </div>
  )
}

export default Users