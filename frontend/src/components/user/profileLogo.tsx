import { useAuth } from "../../auth";
import { useState, useRef } from "react";

import styling from "./../../styles/user/profileLogo.module.css"

export default function ProfileLogo() {
  const { user, setUser, loading: authLoading } = useAuth();
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const hideTimer = useRef<number | null>(null);

  const profileInitial = user.first_name[0].toUpperCase();

  const showNow = () => {
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setProfileMenuVisible(true);
  };

  const hideSoon = () => {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setProfileMenuVisible(false), 150);
  };

  return (
    <div
      className={ styling.loggedInWrapper }
      onMouseEnter={showNow}
      onMouseLeave={hideSoon}
    >
      <button
        className={ styling.loggedInButton }
        aria-haspopup="menu"
        aria-expanded={profileMenuVisible}
        aria-controls="profile-menu"
        onClick={() => setProfileMenuVisible(v => !v)}
      >
        { profileInitial }
      </button>

      <nav
        className={`${styling.profileMenu} ${profileMenuVisible ? styling.profileMenuOpen : ''}`}
        aria-hidden={!profileMenuVisible}
        aria-label="Profile menu"
        id="profile-menu"
      >
        <ul role="menu">
          <li role="none">
            <a href="/profile" role="menuitem">Profile</a>
          </li>
          <li role="none">
            <a href="/auth/logout" role="menuitem">Log out</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}


