import styling from "../../styles/foundationResponse/FRStyling.module.css"

export default function FRContent() {

/*
Fields
  width, load, eccentricity, 
  soil layers
*/

  return (
    <>
      <form className={styling.FRArea}>
        <div className={styling.width}>
          <label htmlFor="width">Width [m]</label>
          <input id="width" name="width" type="text" required/>
        </div>

        <div className={styling.load}>
          <label htmlFor="load">Load [kPa]</label>
          <input id="load" name="load" type="text" required/>
        </div>

        <div className={styling.eccentricity}>
          <label htmlFor="eccentricity">Eccentricity [m]</label>
          <input id="eccentricity" name="eccentricity" type="text" required/>
        </div>

        <div className={styling.soilLayers}>
          
        </div>

        <div className={styling.calculate}>
          <button type="submit">Calculate</button>
        </div>

        <div className={styling.result}>Result</div>
      </form>      
    </>
  )
}