import React from 'react'

const ListItem = ({className,text,children}) => {
  return (
    <li className={className}>{text}{children}</li>
  )
}

export default ListItem