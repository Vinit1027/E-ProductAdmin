import React from 'react'
import { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios'

const ProductList = () => {

  const [Proddata, setProdData] = useState([]);


  const getProductdata = async ()=> {

  await axios.get('https://e-products-api.onrender.com/apiv1/products/get-products',
    {
      withCredentials:true,
      credentials: "include"
    })
    .then( response => response)
    .then(data => setProdData(data.data.data))
  }

  useEffect(()=>{

    getProductdata();

  },[])

  console.log(Proddata)




  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {
            Proddata.map((ele,ind)=> {
              return (

                <Grid xs={12} sm={6} md={3}>
                  <div className='cardroot'>
                    <div className='cardcard'>
                      <div>
                        <Carousel indicators={false}>
                          {
                            ele.images.map((e,i)=>{

                              return (
                                <img src={`https://e-products-api.onrender.com/${e}`} style={{ height: '150px', width: '100%',  objectFit: 'contain'}} />  
                              )
                            })
                          }
                        </Carousel>
                      </div>
                      <div className='cardtitle'>
                        <h6 className='titletext'>{ele.name}</h6>
                        <p className='desctext'>{ele.description}</p>
                        <div className='btmsec'>
                          <div>
                            <Rating sx={{ fontSize: 12}} size="small" name="read-only" value={ele.rating} readOnly />
                          </div>
                          <div>
                            <h6 className="valuetext">
                              <span></span>
                              &nbsp;${ele.price}
                            </h6>
                          </div>
                        </div>
                        <div>
                          <p className='stocksize'>In stock : <b>{ele.stock}</b></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
              )
            })
          }
        </Grid>
      </Box>
      {/* <Container>
        <div className='mainwrap'>
            {
              Proddata.map((ele,ind)=> {


                console.log(ele)


                return (

                  <div className='cardroot'>
                    <div className='cardcard'>
                      <div>
                        <Carousel indicators={false}>
                          {
                            ele.images.map((e,i)=>{

                              return (
                                <img src={`http://localhost:8001/${e}`} style={{ height: '150px', width: '100%',  objectFit: 'contain'}} />  
                              )
                            })
                          }
                        </Carousel>
                      </div>
                      <div className='cardtitle'>
                        <h6 className='titletext'>{ele.name}</h6>
                        <p className='desctext'>{ele.description}</p>
                        <div className='btmsec'>
                          <div>
                            <Rating sx={{ fontSize: 12}} size="small" name="read-only" value={ele.rating} readOnly />
                          </div>
                          <div>
                            <h6 className="valuetext">
                              <span></span>
                              &nbsp;${ele.price}
                            </h6>
                          </div>
                        </div>
                        <div>
                          <p className='stocksize'>In stock : <b>{ele.stock}</b></p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
        </div>
      </Container> */}
    </div>
  )
}

export default ProductList