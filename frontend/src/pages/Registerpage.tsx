import UserRegistration from "./../components/user/registration"

import stylesMainArea from "./../styles/MainAreaStyling.module.css"

export default function Registerpage() {
  return (
    <div className={ stylesMainArea.mainArea }>
      <div>
        <UserRegistration/>
      </div>
      
    </div>
  )
}
