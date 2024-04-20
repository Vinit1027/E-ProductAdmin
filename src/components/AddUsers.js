import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Container from '@mui/material/Container';

const AddUsers = () => {

  const [data, setData] = useState([]);
  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [editId, setEditid] = useState(1);

  const GetUserData = async ()=> {

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
    .catch( err => console.log(err))
  }

  useEffect(()=> {
    GetUserData()
  },[])

  console.log(data)

  const handleSubmit = async (e)=> {
    // e.preventDefault();
    const userData = {
      name : name,
      email : email,
      password : password,
      contact : contact
    }

    await axios.post('https://e-products-api.onrender.com/apiv1/user/add-user', userData, {
      headers: {
        'Content-Type' : 'multipart/form-data',
      }
    },{
      withCredentials:true,
      credentials: "include"
    })
    .then(response => response)
    .then(resdata => console.log(resdata))
    .catch((er) => console.log(er))

  }

  const handleEdit = (id)=> { 
    setEditid(id);
  }

  const handleDelete = async (id)=> {

    await axios.delete(`https://e-products-api.onrender.com/apiv1/user/delete-user/${id}`,{
      
      headers: {
        'Content-Type' : 'multipart/form-data',
      }
    },{

      withCredentials:true,
      credentials: "include"
    })
    .then(response => response)
    .then(resdata => {
      console.log(resdata)
    })
    .catch((er) => console.log(er))
    
    window.location.reload()


  }


  const handleBack = ()=> {
    setEditid(1)
  }

  const handleUpdate = async()=> {

    const userData = {
      name : name === '' ? undefined : name,
      email : email === '' ? undefined : email,
      password : password === '' ? undefined : password,
      contact : contact === '' ? undefined : contact
    }

    console.log(userData);

    await axios.patch(`https://e-products-api.onrender.com/apiv1/user/update-user/${editId}`, userData, {
      headers: {
        'Content-Type' : 'multipart/form-data',
      }
    },{
      withCredentials:true,
      credentials: "include"
    })
    .then(response => response)
    .then(resdata => console.log(resdata))
    .catch((er) => console.log(er))

    setEditid(1);


  }

  console.log(editId);

  return (
    <>
    <Container>
      <h4 className='btmbrder'>ADD NEW USER</h4>
      <form style={{ marginBottom : '40px' }} onSubmit={handleSubmit}>
        <input className='inpad' type='text' placeholder = 'Enter Name' onChange={(e)=> setName(e.target.value)}/>
        <input className='inpad' type='text' placeholder = 'Enter Email' onChange={(e)=> setEmail(e.target.value)}/>
        <input className='inpad' type='text' placeholder = 'Enter Password' onChange={(e)=> setPassword(e.target.value)}/>
        <input className='inpad' type='text' placeholder = 'Enter Contact' onChange={(e)=> setContact(e.target.value)}/>
        <button className='shapebutton4' type='submit'>ADD</button>
      </form>
      <h4 className='btmbrder'>UPDATE/DELETE USERS</h4>
      <table className='cattable'>
        <thead>
          <tr className='cellhead'>
            <th className='cellbox'>ID</th>
            <th className='cellbox'>Name</th>
            <th className='cellbox'>Email</th>
            <th className='cellbox'>Password</th>
            <th className='cellbox'>Contact</th>
            <th className='cellbox'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((ele)=> {

              return(

                ele._id === editId ? 

                <tr key={ele._id}>
                  <td>{ele._id}</td>
                  <td><input type='text' defaultValue={ele.name} onChange={(e)=> {
                    console.log(e)
                    setName(e.target.value)
                  }}/></td>
                  <td><input type='text' defaultValue={ele.email} onChange={(e)=> setEmail(e.target.value)}/></td>
                  <td><input type='text' defaultValue={ele.password} onChange={(e)=> setPassword(e.target.value)}/></td>
                  <td><input type='text' defaultValue={ele.contact} onChange={(e)=> setContact(e.target.value)}/></td>
                  <td>
                    <div style={{ display: 'flex'}}>
                        <button className='shapebutton' onClick={handleUpdate} style={{ marginRight: '10px'}}>Update</button>
                        <button className='shapebutton2' onClick={handleBack}>Back</button>
                    </div>
                  </td>
                </tr>
                :
                <tr key={ele._id}>
                  <td className='cellbox2'>{ele._id}</td>
                  <td className='cellbox2'>{ele.name}</td>
                  <td className='cellbox2'>{ele.email}</td>
                  <td className='cellbox2'>{ele.password}</td>
                  <td className='cellbox2'>{ele.contact}</td>
                  <td className='cellbox2'>
                    <div style={{ display : 'flex'}}>
                      <button className='shapebutton3' style={{ marginRight: '10px'}} onClick={()=> handleEdit(ele._id)}>Edit</button>
                      <button className='shapebutton2' onClick={()=> handleDelete(ele._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              )

            })
          }
        </tbody>
      </table>
    </Container>
    </>
  )
}

export default AddUsers
