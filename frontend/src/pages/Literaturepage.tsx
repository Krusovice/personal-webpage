import AppWindow from "./../components/AppWindow"
import LiteratureApp from "./../components/literature/LiteratureApp"
import LiteratureDocs from "./../components/literature/LiteratureDocs"

export default function Literaturepage() {
  return (
    <div>
      <AppWindow
        tabs={["App", "Docs"]}
        components={[LiteratureApp, LiteratureDocs]}
      />
    </div>
    
  )
}
