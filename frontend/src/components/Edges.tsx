
import stylesEdges from "./../styles/EdgeStyling.module.css"

export default function Edges() {
  return (
    <>
      <div className={stylesEdges.left_edge}>
        <h1>Left edge</h1>
      </div>
      <div className={stylesEdges.right_edge}>
        <h1>Right edge</h1>
      </div>
    </>
  )
}
