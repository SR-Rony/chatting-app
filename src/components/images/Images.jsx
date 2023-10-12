import React from 'react'

const Images = ({className,src}) => {
  return (
    <img className={className} src={src} alt="img" />
  )
}

export default Images