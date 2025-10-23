import { Link } from "react-router-dom";
import logoUrl from "./../assets/react.svg";
import stylesTopbar from "./../styles/TopbarStyling.module.css"



export default function Topbar() {
  return (
    <div className={ stylesTopbar.topbar }>

      <ul className={ stylesTopbar.list }>
        <li>
          <Link to="/" aria-label="Home">
            <img src={logoUrl} alt="" className={stylesTopbar.logo} />
          </Link>
        </li>

        <li>
          <Link className= {stylesTopbar.link} to="/literature">Literature DB</Link>
        </li>

        <li>
          <a className= {stylesTopbar.link} href="/">Selected Stocks</a>
        </li>

        <li>
          <a className= {stylesTopbar.link} href="/">Foundation Response</a>
        </li>

        <li className={stylesTopbar.right}>
          <a className= {stylesTopbar.link} href="/">Profile</a>
        </li>

      </ul>
    </div> 
  )
}
