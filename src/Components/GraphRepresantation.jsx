import React, { useState, useEffect } from 'react';
import axiosMain from "../http/axios/axios_main";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function GraphRepresantation({id}) {
   const[amount,setAmount] = useState();
   const[date,setDate] = useState();
   const[dataNew,setDataNew] = useState();
 
      const getData = async() => {

       if(id){
    const res = await axiosMain.post(`/getDatePriceHistry`,{
        content_id: id 
    })
    
    setDataNew(res.data.data)

      }

        }
       
     
      
      useEffect(() => {
        getData();
      },[id])
   
  return (
    <ResponsiveContainer width="100%" height="100%">
    <AreaChart
      width={500}
      height={400}
      data={dataNew}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="amount" stroke="#A77327" fill="#F2C649" />
    </AreaChart>
  </ResponsiveContainer>
  )
}

export default GraphRepresantation
