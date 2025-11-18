import styles from "./../styles/Content.module.css"
import stylesLiteraturePage from "./../styles/LiteratureStyling.module.css"
//import LiteratureSearch from "./../components/LiteratureSearch"
import LiteratureContent from "./../components/literature/Literature"


export default function Literaturepage() {
  return (
    <div className={[styles.content, stylesLiteraturePage.literaturePage].join(' ')}>
      {/* <LiteratureSearch /> */}
      <LiteratureContent/>
    </div>
    
  )
}
