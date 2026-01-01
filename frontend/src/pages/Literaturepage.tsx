import styles from "./../styles/Content.module.css"
import LiteratureContent from "./../components/literature/Literature"


export default function Literaturepage() {
  return (
    <div className={ styles.content }>
      <LiteratureContent/>
    </div>
    
  )
}
