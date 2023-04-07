import { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { RxChevronDown, RxChevronUp } from 'react-icons/rx'
import { MdWineBar } from 'react-icons/md'

import { HeaderSetting } from './HeaderSetting'
import { useRouter } from "../useHook/useRouter"

import styles from './Header.module.scss'

export const Header = () => {
  const{ routeTo } = useRouter()
  const [isClickSetting, setIsClickSetting] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.mainLogo}> 
          <MdWineBar className={styles.icon}/>
          <h1 className={styles.title} onClick={()=>routeTo('/beverage/all')}>
            Natural Mood
          </h1>
        </div>
        <div className={styles.settingInfo} onClick={()=>setIsClickSetting(!isClickSetting)}>
          <FaUserCircle className={styles.settingIcon}/>
          {
            isClickSetting
            ? <RxChevronDown className={styles.arrowDownIcon}/>
            : <RxChevronUp className={styles.arrowUpIcon}/>
          }
        </div>
        {isClickSetting && <HeaderSetting/>}
      </div>
    </header>
  )
}
