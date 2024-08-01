import React from 'react'
import Listitem from './listitem'

function Hotellist(props) {
 return (
  props.props.loading?"Loading":
    <>
    <div style={{display:"flex",flexDirection:"column"}}>  
        {props.props.data.map(((item)=>{
            return <Listitem props={item}/>
        }))
        }
    </div>
    </>
  )
}

export default Hotellist