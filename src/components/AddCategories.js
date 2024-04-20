import React from 'react'
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

const AddCategories = () => {


  const [name, setName] = useState('');

  const [description, setDescription] = useState('');

  const [image, setImage] = useState(null);

  const [imageData, setImageData] = useState();


  const fileBrowseHandler = (e)=> {

    // var path = (window.URL || window.webkitURL).createObjectURL(e.target.files[0]);

    setImage(URL.createObjectURL(e.target.files[0]));

    const idata = e.target.files[0]

    setImageData(idata)
  }

  console.log(imageData)

  console.log(image)


  const handleSubmit = async(e)=> {

    e.preventDefault();

    const picData = new FormData();

    picData.append('file', imageData);
    picData.append('name', name);
    picData.append('description', description);
    picData.append('path', image);

    const formDataObj = {};
    picData.forEach((value, key) => (formDataObj[key] = value));

    console.log(formDataObj)

    await axios.post('https://e-products-api.onrender.com/apiv1/category/add-category', formDataObj,
    {
      headers: {
        'Content-Type' : 'multipart/form-data',
      }
    })
    .then(response => response)
    .then(resdata => console.log(resdata))
    .catch((er) => console.log(er))

    window.location.reload();

  }

  
  return (
    <div>
      <Container maxWidth="sm">
        <div className='padbetween'>
          <form onSubmit={handleSubmit}>
            <div className='margbet'>
              <label  className='disblk'>Category Name</label>
              <input type='text' placeholder='Enter Category Name' className='inputspace' onChange={(e)=> setName(e.target.value)}/>
            </div>
            <div className='margbet'>
              <label className='disblk'>Category Description</label>
              <textarea className='inputspace' placeholder='Enter Category Description' onChange={(e)=> setDescription(e.target.value)}></textarea>
            </div>
            <div className='margbet'>
              <label  className='disblk'>Images</label>
              <img src={image} style={{ height: '100px', width: '120px'}}/>
              <div className='imagebox'>
                <label className="myLabel">
                  <div className='centerthem'>
                    <input type="file" className='inputspace' onChange={fileBrowseHandler} />
                    <CloudUploadIcon sx={{ display : 'block', marginLeft: '12px'}}/>
                    <span className='upborder'>Upload</span>
                  </div>
                </label>
              </div>
            </div>
            <button className='buttoncss' type='submit'>Add Category</button>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default AddCategories