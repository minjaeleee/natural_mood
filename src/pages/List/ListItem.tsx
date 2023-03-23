import styles from './ListItem.module.scss'

export const ListItem = ({src, title,info, options}) => {
  const handleErrorImg = (e) => {
    e.target.src = "/img/default-beer.jpg"
    e.target.style.height = "150px"
  }
  return (
    <div className={styles.items}>
      <div className={styles.imgBox}>
        <img
          className={styles.img}
          onError={handleErrorImg}
          src={src}
          alt={title}
        />
      </div>
      <div className={styles.itemDesc}>
        <span className={styles.title}>{title}</span>
        <span className={styles.info}>{info}</span>
      </div>
    </div>
  )
}
