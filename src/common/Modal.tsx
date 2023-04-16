import React, { useEffect,useMemo } from 'react'
import { IPosition } from '../types/modal'
import { useKeyEscClose } from '../useHook/useKeyEscClose'

import styles from './Modal.module.scss'

interface IProps {
  children: React.ReactNode,
  isOpen?: boolean,
  setIsOpen?: (arg:boolean)=> void,
  width?: string,
  height?: string,
  xAxis?: "left" | "center" | "right",
  yAxis?: "bottom" | "center" | "top",
}

export const Modal= ({
  children,
  isOpen = true,
  setIsOpen = ()=> {},
  width = "410px",
  height = "320px",
  xAxis = "center",
  yAxis = "center"
}: IProps) => {

  useEffect(()=>{
    if(isOpen) {
      document.body.style.cssText = "overflow:hidden"
      return () => {
        document.body.style.cssText = "overflow:"
      }
    }
  },[isOpen])

  const styledPosition = useMemo(() => {
    const style:IPosition = {
      width,
      height,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "auto",
      marginBottom: "auto",
    }

    if (yAxis === "bottom") {
      style.marginBottom = 0
    }
    if (yAxis === "top") {
      style.marginTop = 0
    }
    if (xAxis === "left") {
      style.marginLeft = 0
    }
    if (xAxis === "right") {
      style.marginRight = 0
    }

    return style
  }, [height, width, xAxis, yAxis]);

  useKeyEscClose(()=> 
    setIsOpen(false)
  )

  return (
    <div className={styles.wrapper}>
      {/* 컨텐츠 뼈대 위치, 크기 조절 */}
      <div className={styles.innerWrapper} style={styledPosition}>
        <div className={styles.contentWrapper}>
          {children}
        </div>
      </div>
    </div>
  )
}
