import axios from 'axios'
import { useState,useEffect} from 'react';


const Fetch=(url)=> {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(false)

    useEffect(() => {
      const fetchdata=async ()=>{
        setLoading(true);
        try{
            const response=await axios.get(url);
            setData(response.data);
            console.log(data);
        }
        catch(err){
            setErr(err);  
            console.log(err);
        }
        setLoading(false);
      }
      fetchdata();
    }, [url])
    

    const refetchdata=async ()=>{
      console.log("refech")
      setLoading(true);
      try{
          const response=await axios.get(url);
          setData(response.data);
      }
      catch(err){
          setErr(err);  
          console.log(err);
      }
      setLoading(false);
    }
    return {data,loading,err,refetchdata}
}

export default Fetch