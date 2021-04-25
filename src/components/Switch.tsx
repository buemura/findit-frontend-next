import React, { useState } from 'react';

const MySwitch = ({className, id}) => {
  const [count, setCount] = useState('');

  return(
    <div className={className + count} id={id} onClick={ () => {
      setCount(count === ' active' ? '' : ' active');
      document.querySelector('.menuItems').classList.toggle('active');
      document.querySelector('.pageLinks').classList.toggle('active');
    } }></div>
  )
}

export default MySwitch;