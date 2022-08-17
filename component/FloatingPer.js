import React from 'react'

const FloatingPer = (props) =>{
    const {polygonClass,Icon,value} = props || {}
    
    return(
        <p
        style={{position:'absolute', fontStyle: 'normal',fontWeight: 400,lineHeight: '20px',}}
       className={polygonClass}
        >
           {Icon}  {value}
        </p>
    )
}

export default FloatingPer