import React from 'react';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import axios from 'axios';

const CategoryList = () => {

  const [catdata, setCatData] = useState([]);

  const getCategorydata = async ()=> {

  await axios.get('https://e-products-api.onrender.com/apiv1/category/get-category',
    {
      withCredentials:true,
      credentials: "include"
    })
    .then( response => response)
    .then(data => setCatData(data.data.data))
  }

  useEffect(()=>{

    getCategorydata();

  },[])


  console.log(catdata)



  return (
    <div>
      <Container>
        <table className='cattable'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>name</th>
              <th>description</th>
            </tr>
          </thead>
          <tbody>
            {
              catdata.map((ele, index)=> {


                console.log(ele.image)

                return (

                  <tr>
                    <td>{ele._id}</td>
                    <td><img src={`https://e-products-api.onrender.com/${ele.image}`} style={{ height: '100px', width: '120px'}}/></td>
                    <td>{ele.name}</td>
                    <td>{ele.description}</td>
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

export default CategoryList