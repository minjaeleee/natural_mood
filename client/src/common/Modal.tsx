import React, { useEffect,useMemo } from 'react'
import { IModal, IPosition } from '../types/modal'

import styles from './Modal.module.scss'

export const Modal:React.FC<IModal> = ({
  children,
  isOpen = true,
  width = "410px",
  height = "700px",
  xAxis = "center",
  yAxis = "center"
}) => {
  useEffect(()=>{
    if(isOpen) {
      document.body.style.cssText = "overflow:hidden"
    } else {
      document.body.style.cssText = "overflow:"
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

  return (
    <div className={styles.wrapper}>
      {/* 컨텐츠 뼈대 위치, 크기 조절 */}
      <div className={styles.innerWrapper} style={styledPosition}>
          {children}
      </div>
    </div>
  )
}
