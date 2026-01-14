import AppWindow from "./../components/AppWindow"
import FoundationResponseApp from "./../components/foundationResponse/FoundationResponseApp"
import FoundationResponseDocs from "./../components/foundationResponse/FoundationResponseDocs"

export default function Foundationpage() {
  return (
    <div>
      <AppWindow
        tabs={["App", "Docs"]}
        components={[FoundationResponseApp, FoundationResponseDocs]}
      />
    </div>
    
  )
}
