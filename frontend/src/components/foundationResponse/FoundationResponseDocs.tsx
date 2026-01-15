import modelErrors from "@/assets/foundationResponse_modelErrors.png"
import featureCoefficients from "@/assets/foundationResponse_featureCoefficients.svg"

export default function FoundationResponseDocs() {
  return(
    <>
      <h2>The Foundation Response App Documentation</h2>
      <p>The foundation response app allows the user to evaluate vertical foundation settlements based on design inputs through an ML-model.</p>

      <p>The settlement predictions are based on a surrogate model of plane strain FE calculations. 
        A linear and a 2nd order polynomial regression model have been applied to model the settlement behaviour across varying foundation widths and subgrade layers. 
        Model errors can be seen in figure 1.</p>

      <p>Note: As a surface load of 100 kPa has been applied to the foundations in the training data.
        Hence, the deployed model, evaluates a settlement based on 100 kPa, 
        and considers a proportional correlation between settlements and the applied load compared to 100 kPa.</p>

      <h3>ML model and Feature Engineering</h3>
      <p>The model has been based on around 5600 Plaxis 2D calculations. 
      A train-test-split of 90-10 has been applied This leaves around 560 test cases, which is considered sufficient.</p>
      <p>In the following, the models' feature engineering is discussed.</p>

      <h4>Inversed E-modulus</h4>
      <p>The subgrade E-modulus has been inversed, as the settlements are expected to be correlated to 1/E and not E directly.</p>
      
      <h4>Subgrade layer depth and foundation size ratio</h4>
      <p>For smaller foundation widths, the upper layers become significantly more important compared to the
        deeper layers, as the stress propagation spreads out causing almost no strain in the deeper layers. The
        increment of this effect decreases per foundation width, as the foundation size increases. Hence, the
        difference between a 1-2 m foundation width is significantly larger than a 4-5 m foundation width.
        When a linear regression model fits to all model results and they are weighted evenly, it is evident,
        that feature coefficient for the deeper layers are overestimated for small foundations, and that the
        upper layers are significantly underestimated for smaller foundations.</p>
      
      <p>The effect can to some degree be captured in the linear regression model by adding a new feature
        per soil layer, which is the soil layers’ inverse stiffness multiplied by foundation size. This provides a
        parameter that allows the foundation size’ influence on the soil layer (to a first degree) to be captured.
        That feature coefficient per soil layer along with the soil layer coefficient itself, allows for a non-linear
        soil layer influence in relation to foundation size, and different soil level feature coefficient, 
        based on foundation size.</p>

      <p>Adding this, significantly increases accuracy across varying foundation sizes. 
        The effect is also significant for a polynomial model.</p>

      <h3>Training Data</h3>

      <p>The training data is based on Plaxis 2D FE models are made with a stiff plate element, 
      exposed to a vertical force with varying eccentricity. 
      The subgrade consists of random layers per 0.5 m. 
      The subgrade layers are modeled with a Mohr-Coulomb soil model with a high failure criterion.
      Below, the model inputs are listed.</p>

      <ul>
        <li>Stiff plate element, width varies between 1-4 m.</li>
        <li>Load applied is an out-of-plane lineload equivalent to 100 kN/m/m · foundation width. </li>
        <li>Load is placed with a random eccentricity between 0 and 0.3 · foundation width.</li>
        <li>Bottom boundary conditions are equivalent to 2·foundation width.</li>
        <li>Total model width is 4·foundation width. The foundation is placed at model center.</li>
        <li>Subgrade layers are created with E-modulus randomly between 10 and 100 MPa. Poissons ratio of 0.3 is applied. Angle of friction of 40° and c’=300 kPa have been applied.</li>
      </ul>
    

      <figure>
        <img src={modelErrors} alt="Model Errors"/>
        <figcaption>Figure 1: Model Errors</figcaption>
      </figure>

      <figure>
        <img style={{ width: "100%" }} src={featureCoefficients} alt="Feature Coefficients"/>
        <figcaption>Figure 2: Feature Coefficients</figcaption>
      </figure>
    </>
  )
}