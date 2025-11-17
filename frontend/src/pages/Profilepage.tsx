import UserRegistration from "./../components/user/registration"

import styles from "./../styles/Content.module.css"

export default function Profilespage() {
  return (
    <div className={ styles.content }>
      <div>
        <UserRegistration/>
      </div>
      
    </div>
  )
}
