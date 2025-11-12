import { useAuth } from "../../auth";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";


import styling from "./../../styles/user/profileLogo.module.css"

export default function ProfileLogo() {
  const navigate = useNavigate();
  const { user, setUser, loading: authLoading } = useAuth();
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const hideTimer = useRef<number | null>(null);

  // 1) While auth is loading, render nothing (or a tiny skeleton)
  if (authLoading || !user.first_name) {
    return <div className={styling.loggedInWrapper} aria-hidden="true">…</div>;
  }

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

  async function logout() {
    const r = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
      cache: "no-store",
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    console.log("logout: cleared user");
    setUser(null);
    navigate("/");
  }

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
            <a 
              href="/profile" 
              role="menuitem"
              className={styling.profileMenuItem}
            >Profile</a>

          </li>
          <li role="none">
            <button 
              type="button"
              role="menuitem"
              className={styling.profileMenuItem}
              onClick={() => void logout()}
            >Log out</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}


