import UserLogin from "./../components/user/login"
import UserRegistration from "./../components/user/registration"

import stylesMainArea from "./../styles/MainAreaStyling.module.css"

export default function Profilespage() {
  return (
    <div className={ stylesMainArea.mainArea }>
      <div>
        <UserLogin/>  
      </div>
      
      <div>
        <UserRegistration/>
      </div>
      
    </div>
    
  )
}
