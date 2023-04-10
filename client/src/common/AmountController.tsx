import styles from './AmountController.module.scss';

export const AmountController = ({onClickIncrease, onClickDecrease, price, amount}) => {
  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.btn} ${amount<2 && styles.inactiveBtn}`} 
        onClick={onClickDecrease}
      > 
        - 
      </button>
      <input 
        className={styles.amount}
        type="number"
        disabled={true}
        value={amount}
        min={1}
        max={99}
      />
      <button
        className={styles.btn} 
        onClick={onClickIncrease}
      >
        + 
      </button>
    </div>
  )
}
