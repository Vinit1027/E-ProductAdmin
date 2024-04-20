import React from 'react'
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Cookies from 'js-cookie';

const AddProducts = () => {
  

  const [catdata, setCatData] = useState([]);

  const [image, setImage] = useState([]);

  const [name , setName] = useState('');

  const [desc, setDesc] = useState('');

  const [ cat, setCat ] = useState('');

  const [images, setImages] = useState(null);

  const [rating, setRating] = useState('');

  const [price, setPrice] = useState('');

  const [stock, setStock] = useState('');


  const getCategorydata = async ()=> {

  await axios.get('https://e-products-api.onrender.com/apiv1/category/get-category')
    .then( response => response)
    .then(data => setCatData(data.data.data))
  }

  useEffect(()=>{

    getCategorydata();

  },[])

  const Authorize = String(Cookies.get('admin'))


  const handleCat = (e)=> {

    setCat(e.target.value)

  }



  const fileBrowseHandler = (e)=> {

    console.log(e.target.files)

    const tempArr = [...e.target.files];


    const imageArr = tempArr.map((ele)=> URL.createObjectURL(ele))

    setImage(imageArr)

    setImages(e.target.files)


  }

  console.log(images)



  const handleSubmit = async(e)=> {

    e.preventDefault();

    const ProductData = new FormData();

    Object.values(images).forEach(file=>{
      ProductData.append("file", file);
    });

    ProductData.append('name', name);
    ProductData.append('description', desc);
    ProductData.append('category', cat);
    ProductData.append('rating', rating);
    ProductData.append('price', price);
    ProductData.append('stock', stock);


    // const formDataObj = {};


    // ProductData.forEach((value, key) => (formDataObj[key] = value));

    // console.log(formDataObj)


    await axios.post('https://e-products-api.onrender.com/apiv1/products/add-product', ProductData,
    {
      headers: {
        'Content-Type' : 'multipart/form-data',
        'Authorization': Authorize
      }
    },
    {
      withCredentials:true,
      credentials: "include"
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
              <label  className='disblk'>Product Name</label>
              <input type='text' placeholder='Enter Product Name' className='inputspace' onChange={(e)=> setName(e.target.value)}/>
            </div>
            <div className='margbet'>
              <label  className='disblk'>Product Description</label>
              <textarea className='inputspace' onChange={(e)=> setDesc(e.target.value)}></textarea>
            </div>
            <Box sx={{ minWidth: 120, marginBottom: '10px' }}>
              <label  className='disblk'>Categories</label>
              <FormControl sx={{ width: 150}}>
                <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={cat}
                  label="Categories"
                  onChange={handleCat}
                >
                  {
                    catdata.map((ele,index)=> {
                      return (
                        <MenuItem key={ele._id} value={ele._id}>{ele.name}</MenuItem>
                      )
                    })
                  }
                </Select>
              </FormControl>
            </Box>
            <div className='margbet'>
              <label  className='disblk'>Images</label>
              <div className='bringboxline'>
                {
                  image.map((e, i)=>{
                    return (
                      <img key={i} src={e} style={{ height: '100px', width: '120px', marginRight: '10px'}}/>
                    )
                  })
                }
                <div className='imagebox'>
                  <label className="myLabel">
                    <div className='centerthem'>
                      <input type="file" className='inputspace' multiple onChange={fileBrowseHandler} />
                      <CloudUploadIcon sx={{ display : 'block', marginLeft: '12px'}}/>
                      <span className='upborder'>Upload</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <div className='margbet'>
              <label  className='disblk'>Rating</label>
              <input type='text' placeholder='Rating out of 5' className='inputspace' onChange={(e)=> setRating(e.target.value)}/>
            </div>
            <div className='margbet'>
              <label  className='disblk'>Price</label>
              <input type='text' placeholder='Enter Price' className='inputspace' onChange={(e)=> setPrice(e.target.value)}/>
            </div>
            <div className='margbet'>
              <label  className='disblk'>Stock</label>
              <input type='text' placeholder='Enter Stock Amount' className='inputspace' onChange={(e)=> setStock(e.target.value)}/>
            </div>
            <button className='buttoncss' type='submit'>Add Product</button>
          </form>
        </div>
      </Container>
    </div>
  ) 
}

export default AddProducts