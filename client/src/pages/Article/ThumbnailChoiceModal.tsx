import React, { useRef, useState, useEffect } from 'react'
import { Modal } from '../../common/Modal'
import { thumbnailData } from './thumbnailData';

import styles from './ThumbnailChoiceModal.module.scss'

export const ThumbnailChoiceModal = ({setIsOpen, setselectedThumbnail}) => {
  const TOTAL_SLIDES = thumbnailData.length -1
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const slideRef = useRef<HTMLImageElement>(null)
  
  const onClickNextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0)
    } else {
      setCurrentSlide(currentSlide + 1)
    }
  };

  const onClickPrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES)
    } else {
      setCurrentSlide(currentSlide - 1)
    }
  };

  const onSubmit = () => {
    setselectedThumbnail(thumbnailData[currentSlide].src)
    setIsOpen(false)
  }
  
  return (
    <Modal setIsOpen={setIsOpen}>
      <div
        className={styles.imgBox}
        ref={slideRef}
      >
        <img 
          className={styles.img}
          src={thumbnailData[currentSlide].src}
          alt={thumbnailData[currentSlide].alt}
        />
      </div>
      <div className={styles.btnBox}>
        <button 
          className={styles.prevBtn}
          onClick={onClickPrevSlide}
        >
          이전
        </button>
        <button
          className={styles.selectBtn}
          onClick={onSubmit}
        >
          선택하기 
        </button>
        <button 
          className={styles.nextBtn}
          onClick={onClickNextSlide}
        >
          다음
        </button>
      </div>
    </Modal>
  )
}
