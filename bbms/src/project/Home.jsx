import React from 'react'
import Layout from './layout'
import img from '../logo192.png'
import { Outlet } from 'react-router-dom';

export default function Home() {
  return (
  
   <Layout>
   <img src={img} alt="logo" width="100" height="100" />
   </Layout>
   
   
  )
}
