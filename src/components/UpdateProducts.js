import React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Cookies from 'js-cookie';
import axios from 'axios';

const UpdateProducts = () => {


  const [Proddata, setProdData] = useState([]);

  const [catdata, setCatData] = useState([]);

  const [image, setImage] = useState([]);

  const [prodid, setProdid] = useState('');

  
  const [name, setName] = useState('');
  
  const [desc, setDesc] = useState('');

  const [ cat, setCat ] = useState('');
  
  const [images, setImages] = useState([]);

  const [rating, setRating] = useState('');

  const [price, setPrice] = useState('');

  const [stock, setStock] = useState('');

  const getProductdata = async ()=> {

  await axios.get('https://e-products-api.onrender.com/apiv1/products/get-products')
    .then( response => response)
    .then(data => setProdData(data.data.data))
  }

  useEffect(()=>{

    getProductdata();

  },[])

  console.log(Proddata)



  const getCategorydata = async ()=> {

  await axios.get('https://e-products-api.onrender.com/apiv1/category/get-category')
    .then( response => response)
    .then(data => setCatData(data.data.data))
  }

  useEffect(()=>{

    getCategorydata();

  },[])


  const Authorize = String(Cookies.get('admin'))



  const handleEdit = (id)=> {

    setProdid(id)

  }


  const handleDelete = async (id)=> {

  
    await axios.delete(`https://e-products-api.onrender.com/apiv1/products/delete-product/${id}`,{
      
      headers: {
        'Content-Type' : 'multipart/form-data',
      }
    })
    .then(response => response)
    .then(resdata => {
      console.log(resdata)
    })
    .catch((er) => console.log(er))
    
    window.location.reload();


  }

  const handleCat = (e)=> {

    setCat(e.target.value)

  }


  console.log(cat)

  const fileBrowseHandler = (e)=> {

    console.log(e.target.files)

    const tempArr = [...e.target.files];


    const imageArr = tempArr.map((ele)=> URL.createObjectURL(ele))

    setImage(imageArr)

    setImages(e.target.files)


  }




  const handleBack = ()=> {

      setProdid('')

  }






  const handleUpdate = async (e)=> {

    e.preventDefault();

    const ProductData = new FormData();

    if(images !== []){

      Object.values(images).forEach(file=>{
        ProductData.append("file", file);
      });
    }

    if(name !== ''){

        ProductData.append('name', name);
    }

    if(desc !== ''){
        ProductData.append('description', desc);
    }

    if(cat !== ''){

      ProductData.append('category', cat);

    }

    if(rating !== ''){

      ProductData.append('rating', rating);

    }

    if(price !== ''){

      ProductData.append('price', price);

    }

    if(stock !== ''){

      ProductData.append('stock', stock);

    }

    // for (let [key, val] of ProductData.entries()) {
    //             console.log(key, val);
    //         }



    await axios.patch(`https://e-products-api.onrender.com/apiv1/products/update-product/${prodid}`, ProductData,
    {
      headers: {
        'Content-Type' : 'multipart/form-data',
      }
    })
    .then(response => response)
    .then(resdata => console.log(resdata))
    .catch((er) => console.log(er))

    setProdid('');







  }





  return (
    <div>
      <Container>
        <table className='cattable'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Images</th>
              <th>Rating</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              Proddata.map((ele, index)=> {

                return (

                  ele._id === prodid ? 

                  <tr key={ele._id}>
                    <td>{ele._id}</td>
                    <td><input type='text' placeholder='Enter Category Name'  defaultValue={ele.name} onChange={(e)=> setName(e.target.value)}/></td>
                    <td><input type='text' placeholder='Enter description' defaultValue={ele.description} onChange={(e)=> setDesc(e.target.value)} /></td>
                    <td>
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
                    </td>
                    <td>
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
                    </td>
                    <td><input type='text' placeholder='Enter Rating' defaultValue={ele.rating} onChange={(e)=> setRating(e.target.value)} /></td>
                    <td><input type='text' placeholder='Enter Price' defaultValue={ele.price} onChange={(e)=> setPrice(e.target.value)}/></td>
                    <td><input type='text' placeholder='Enter Stock' defaultValue={ele.stock} onChange={(e)=> setStock(e.target.value)} /></td> 
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
                    <td>{ele.name}</td>
                    <td>{ele.description}</td>
                    <td>{ele.category._id}</td>
                    <td>
                      <div style={{display : 'flex'}}>
                          {
                            ele.images.map((e,i)=> {

                              return (

                                <img src={`https://e-products-api.onrender.com/${e}`} style={{ height: '100px', width: '120px',marginRight: '10px', objectFit: 'contain'}}/>

                              )
                            })
                          }
                      </div>
                    </td>
                    <td>{ele.rating}</td>
                    <td>{ele.price}</td>
                    <td>{ele.stock}</td>
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

export default UpdateProducts