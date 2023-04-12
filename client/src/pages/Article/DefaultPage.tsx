import React from 'react'

import styles from '../Article.module.scss';

export const DefaultPage = () => {
  return (
    <>
      {
      Array(4).fill(1).map(el => 
        <div className={styles.list}>
          <div className={styles.imgBox}>
            <img 
              src={"https://www.k-startup.go.kr//images/homepage/prototype/noimage.gif"}  
              alt={"기본 이미지"}
              className={styles.img}
              loading="lazy"
              decoding="async"
              />
          </div>
        <div className={styles.articleInformation}>
          <div className={styles.descBox}>
            <div
              className={styles.content}
              >
            </div>
          </div>
          <div className={styles.authorBox}>
            <p className={styles.author}>
            </p>
          </div>
        </div>
      </div>
      )
    }
  </>
  )
}
