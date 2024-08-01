import axios from 'axios';
import React,{useState,useEffect} from 'react'

function Fetch(url,Meth) {
    const [data, setdata] = useState(null);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(false);

    useEffect(() => {
        const fetchdata=async ()=>{
            try{
                const data=await axios.request({
                    url: url,
                    method: Meth,
                    withCredentials: true
                })
                console.log(data, "get")
                setdata(data.data)
            }
            catch(err){
                seterror(err);
                console.log(err);
            }
            setloading(false)
        }
        fetchdata()
    }, [url])

    const refetch=async ()=>{
        setloading(true)
        try{
            const data=await axios.request({
                url: url,
                method: Meth,
                withCredentials: true
            })
            console.log(data, "get")
            setdata(data.data)
        }
        catch(err){
            seterror(err);
            console.log(err);
        }
        setloading(false)
    }

    return {data,loading,error,refetch}
}

export default Fetch