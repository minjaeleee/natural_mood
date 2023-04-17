import { useEffect, useState } from "react"
import { useMediaQuery } from 'react-responsive';

export const Desktop = ({ children }) => {
  const [isActive, setIsActive] = useState(false)
  const isDesktop = useMediaQuery({ maxWidth: 1024})
  useEffect(()=> {
    setIsActive(isDesktop)
  },[isDesktop])
  return isActive ? children : null
}

export const Tablet = ({ children }) => {
  const [isActive, setIsActive] = useState(false)
  const isTablet = useMediaQuery({ maxWidth: 768})
  useEffect(()=>{
   setIsActive(isTablet)
  },[isTablet])
  return isActive ? children : null
}

export const Mobile = ({ children }) => {
  const [isActive, setIsActive] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 576})
  useEffect(()=>{
   setIsActive(isMobile)
  },[isMobile])
  return isActive ? children : null
}