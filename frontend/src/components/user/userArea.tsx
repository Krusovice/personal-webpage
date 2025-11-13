import { useAuth } from "../../auth";
import ProfileLogo from "./profileLogo";
import UserLogin from "./login"

export default function UserArea() {
  const { user, loading } = useAuth();

  if (loading) {
    // optional: a small placeholder or nothing
    return null;
  }

  if (user && user.first_name) {
    return <ProfileLogo />;
  }

  return <UserLogin />;
}
