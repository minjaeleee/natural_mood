import React from 'react'
import { Modal } from '../../common/Modal'

import styles from './CartModal.module.scss'

export const CartModal = () => {
  return (
    <Modal>
      <div className={styles.modal}>
        cartModal
      </div>
    </Modal>
  )
}
