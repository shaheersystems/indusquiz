import React from 'react'; 

const Card = (props) => {
  return (
    <div className='shadow w-full bg-white ring-1 ring-gray-200 rounded-md px-4 py-4'>
       
        {props.children}
    </div>
  )
}

export default Card