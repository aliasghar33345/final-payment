import React, { useEffect } from 'react'

const ShowTimer = (props) => {
  const { setIsOpen, counter, setCounter } = props || {}

  const hours = Math.floor(counter / 60);
  const minutes = counter % 60;

  useEffect(() => {
    counter === 0 && setIsOpen(false)
    const timer = counter > 0 && setInterval(() => setCounter((prevCounter) => prevCounter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter, setIsOpen]);

  return (
    <p className='common-text pix-page'>{hours} minutes {minutes} second</p>
  )
}

export default ShowTimer