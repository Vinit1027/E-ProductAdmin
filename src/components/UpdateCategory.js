import React from 'react';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import axios from 'axios';

const UpdateCategory = () => {


    const [catdata, setCatData] = useState([]);

    const [catid, setCatid] = useState('');

    const [catname, setCatname] = useState('');

    const [desc, setDesc] = useState('');

    const [idata, setIdata] = useState(null);

      const [image, setImage] = useState(null);

  const getCategorydata = async ()=> {

  await axios.get('https://e-products-api.onrender.com/apiv1/category/get-category')
    .then( response => response)
    .then(data => setCatData(data.data.data))
  }

  useEffect(()=>{

    getCategorydata();

  },[])


  const handleEdit = (id)=> {

    setCatid(id);

  }


  const fileBrowserData = (e)=> {

    setIdata(e.target.files[0]);

    setImage(URL.createObjectURL(e.target.files[0]));

  }


  const handleBack = ()=> {

    setCatid('')
    
  }


  const handleUpdate = async (e)=> {

    e.preventDefault();

    const CatData = new FormData();

    CatData.append('file', idata === null ? undefined : idata)

    if(catname !== ''){
      CatData.append('name', catname)
    }

    if(desc !== ''){
      CatData.append('description', desc )
    }

    CatData.append('path', image === null ? undefined : image)


    const formDataObj = {};
    CatData.forEach((value, key) => (formDataObj[key] = value));

    console.log(formDataObj)

    await axios.patch(`https://e-products-api.onrender.com/apiv1/category/update-category/${catid}`, formDataObj,
    {
      headers: {
        'Content-Type' : 'multipart/form-data',
      }
    })
    .then(response => response)
    .then(resdata => console.log(resdata))
    .catch((er) => console.log(er))


  }


  const handleDelete = async (id)=> {

    await axios.delete(`https://e-products-api.onrender.com/apiv1/category/delete-category/${id}`,{
      
      headers: {
        'Content-Type' : 'multipart/form-data',
      }
    })
    .then(response => response)
    .then(resdata => {
      console.log(resdata)
    })
    .catch((er) => console.log(er))
    
    window.location.reload()
  }


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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              catdata.map((ele, index)=> {

                return (

                  ele._id === catid ? 

                  <tr key={ele._id}>
                    <td>{ele._id}</td>
                    <td><input type='file' onChange={fileBrowserData}/></td>
                    <td><input type='text' placeholder='Enter Category Name'  defaultValue={ele.name} onChange={(e)=> setCatname(e.target.value)}/></td>
                    <td><input type='text' placeholder='Enter description' defaultValue={ele.description} onChange={(e)=> setDesc(e.target.value)}/></td>
                    <td>
                      <div style={{ display: 'flex'}}>
                        <button className='shapebutton' onClick={handleUpdate} style={{ marginRight: '10px'}}>Update</button>
                        <button className='shapebutton2' onClick={handleBack}>Back</button>
                      </div>
                    </td>
                  </tr>

                  :

                  <tr key={ele._id}>
                    <td>{ele._id}</td>
                    <td><img src={`https://e-products-api.onrender.com/${ele.image}`} style={{ height: '100px', width: '120px'}}/></td>
                    <td>{ele.name}</td>
                    <td>{ele.description}</td>
                    <td>
                      <div style={{ display : 'flex'}}>
                        <button className='shapebutton3' style={{ marginRight: '10px'}} onClick={()=>handleEdit(ele._id)}>Edit</button>
                        <button className='shapebutton2' onClick={()=>handleDelete(ele._id)}>Delete</button>
                      </div>
                    </td>
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

export default UpdateCategory