import { useEffect, useState } from 'react'

import { SideBar } from './SideBar'
import { Modal } from '../../common/Modal'
import { useRouter } from '../../useHook/useRouter'

import styles from "./SideBarModal.module.scss"

export const SideBarModal = ({ isOpenModal, setIsOpenModal }) => {
  const { currentPath } = useRouter()
  const [isClickSideMenu, setIsClickSideMenu] = useState(false)

  useEffect(()=>{
    const path = currentPath && currentPath.split('/')[currentPath.split('/').length-1] 
    if(isClickSideMenu && path !== "all") {
      isClickSideMenu && setIsOpenModal(false)
    }
    setIsClickSideMenu(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentPath])

  return (
    <Modal 
      setIsOpen={setIsOpenModal}
      xAxis={"left"}
      width={"243px"}
      height={"100vh"}
    >
      <div className={styles.wrapper}>
        <SideBar/>
      </div>
    </Modal>
  )
}
