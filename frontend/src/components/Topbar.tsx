
import stylesTopbar from "./../styles/TopbarStyling.module.css"

export default function Topbar() {
  return (
    <div className={ stylesTopbar.topbar }>

      <ul className={ stylesTopbar.list }>
        <li>
          <a className= {stylesTopbar.link} href="/">News</a>
        </li>

        <li>
          <a className= {stylesTopbar.link} href="/">Literature DB</a>
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
