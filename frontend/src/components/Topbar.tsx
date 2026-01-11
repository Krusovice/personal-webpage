import { Link } from "react-router-dom";
import logoUrl from "./../assets/slardar.png";
import stylesTopbar from "./../styles/TopbarStyling.module.css"
import UserArea from "./user/userArea"


export default function Topbar() {
  return (
    <nav className={ stylesTopbar.topbar }>

      <ul className={ stylesTopbar.list }>
        <li className={ stylesTopbar.logoContainer }>
          <Link to="/" aria-label="Home">
            <img src={logoUrl} alt="" className={stylesTopbar.logo} />
          </Link>
        </li>

        <li>
          <Link className= {stylesTopbar.link} to="/literature">Literature DB</Link>
        </li>

        <li>
          <Link className={stylesTopbar.link} to="/stocks">Stock Viewer</Link>
        </li>

        <li>
          <Link className={stylesTopbar.link} to="/foundation">Foundations</Link>
        </li>

        <li className={stylesTopbar.right}>
          <UserArea/>
        </li>

      </ul>
    </nav> 
  )
}
