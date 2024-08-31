import React, { ReactElement } from 'react'
type Props = {
  children?: ReactElement
}
const Layout = ({ children}: Props) => {
  return (
    <>
    { children}
    </>
  )
}

export default Layout