import foundationResponse_modelErrors from "@/assets/foundationResponse_modelErrors.png"

export default function FoundationResponseDocs() {
  return(
    <>
      <h2>The Foundation Response App Documentation</h2>
      <p>The foundation response app allows the user to evaluate vertical foundation settlements based on design inputs.</p>

      <ul>
        <li>Foundation width</li>
        <li>Foudnation load and eccentricity</li>
        <li>Soil conditions</li>
      </ul>

      <p>The settlement predictions are based on a surrogate model of plane strain FE calculations. 
        A linear and a 2nd order polynomial regression model have been applied. 
        The model errors for test cases are shown in the figure below.</p>
        
        <img src={foundationResponse_modelErrors} alt="Model Errors"/>

      <h3>ML model and Feature Engineering</h3>
      <p>The model has been based on around 5600 Plaxis 2D calculations. 
      A train-test-split of 90-10 has been applied This leaves around 560 test cases, which is considered sufficient.</p>

      <p><strong>Inversed E-modulus</strong>The subgrade E-modulus has been inversed, as the settlements are expected to be correlated to 1/E and not E directly.</p>
      <p>
For smaller foundation widths, the upper layers become significantly more important compared to the
deeper layers, as the stress propagation spreads out causing almost no strain in the deeper layers. The
increment of this effect decreases per foundation width, as the foundation size increases. Hence, the
difference between a 1-2 m foundation width is significantly larger than a 4-5 m foundation width.
When the linear regression model fits to all model results and they are weighted evenly, it is evident,
that feature coefficient for the deeper layers are overestimated for small foundations, and that the
upper layers are significantly underestimated for smaller foundations.

      </p>

      <h3>The data</h3>
      <p>The training data is based on Plaxis 2D FE models are made with a stiff plate element, 
      exposed to a vertical force with varying eccentricity. 
      The subgrade consists of random layers per 0.5 m. 
      The subgrade layers are modeled with a Mohr-Coulomb soil model with a high failure criterion.
      Below, the model inputs are listed.</p>

      <ul>
        <li>Stiff plate element, width varies between 1-4 m.</li>
        <li>Load applied is an out-of-plane lineload equivalent to 100 kN/m/m $\cdot$ foundation width. </li>
        <li>Load is placed with a random eccentricity between 0 and 0.3 $\cdot$ foundation width.</li>
        <li>Bottom boundary conditions are equivalent to 2$\cdot$foundation width.</li>
        <li>Total model width is 4$\cdot$foundation width. The foundation is placed at model center.</li>
        <li>Subgrade layers are created with E-modulus randomly between 10 and 100 MPa. Poissons ratio of 0.3 is applied. Angle of friction of 40° and c’=300 kPa have been applied.</li>
      </ul>
    


    </>

  )
}