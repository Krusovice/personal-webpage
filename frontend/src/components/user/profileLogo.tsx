import { useAuth } from "../../auth";

import styling from "./../../styles/user/profileLogo.module.css"

export default function ProfileLogo() {
  const { user, setUser, loading: authLoading } = useAuth();
  
  return (
    <div className={ styling.loggedInWrapper }>
      <button className={ styling.loggedInButton }>
        { user.first_name[0].toUpperCase() }
      </button>
      
    </div>
  );
}


