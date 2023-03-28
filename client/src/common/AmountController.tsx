import styles from './AmountController.module.scss';

export const AmountController = ({changeAmount, price, amount}) => {
  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.btn} ${amount<2 && styles.inactiveBtn}`} 
        onClick={()=>changeAmount("minus", price)}
      > 
        - 
      </button>
      <div className={styles.amount}> {amount} </div>
      <button
        className={styles.btn} 
        onClick={()=>changeAmount("plus", price)}
      >
        + 
      </button>
    </div>
  )
}
