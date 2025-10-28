import stylesMainArea from "./../styles/MainAreaStyling.module.css"
import stylesLiteraturePage from "./../styles/LiteratureStyling.module.css"
//import LiteratureSearch from "./../components/LiteratureSearch"
import LiteratureResults from "./../components/LiteratureResults"


export default function Literaturepage() {
  return (
    <div className={[stylesMainArea.mainArea, stylesLiteraturePage.literaturePage].join(' ')}>
      {/* <LiteratureSearch /> */}
      <LiteratureResults/>
    </div>
    
  )
}
