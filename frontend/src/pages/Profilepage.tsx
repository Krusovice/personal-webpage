import UserLogin from "./../components/profile/login"

import stylesMainArea from "./../styles/MainAreaStyling.module.css"

export default function Profilespage() {
  return (
    <div className={ stylesMainArea.mainArea }>
      <UserLogin/>  
    </div>
    
  )
}
