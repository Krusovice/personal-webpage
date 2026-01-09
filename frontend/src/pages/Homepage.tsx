import layoutStyles from "./../styles/LayoutStyling.module.css"

import AppSubject from "./../components/homepage/AppSubject"

export default function Homepage() {
  return (
    <div className={ `${layoutStyles.window}` }>
      <h1>I'm Joachim, And this is my personal webpage.</h1>
      <h3>
        I'm a professional structural engineer with
        an interest in data and software development.
      </h3>
      <h3>
        My webpage contains a few apps, below the content and stack is listed.
      </h3>
      <AppSubject
        title="Personal Webpage"
        subtitle="My personal webpage is hosted on my Raspberry Pi"
        content=
        {
        <ul>
          <li>Frontend: React Typescript (Vite)</li>
          <li>Backend: Rust (Axum+Tokio)</li>
          <li>Database: PostgreSQL</li>
          <li>Deployment: Docker + Github Actions</li>
          <li>Host: Raspberry Pi 5</li>
        </ul>
        }
      />

      <AppSubject
        title="Literature Database"
        subtitle="An easily accessible searchable database with public literature and personal literature (through user authentication)."
        content=
        {
        <ul>
          <li>Frontend: React + Typescript</li>
          <li>Backend and filtering: Rust + SQL</li>
          <li>Database: PostgreSQL</li>
        </ul>
        }
      />

      <AppSubject
        title="Stock Viewer and Analyser"
        subtitle="An analyser tool that is developed to compare stockprices. Stockvalues are fetched daily. Currently only features a small selection of stocks. Analyze features will be implemented when needed."
        content=
        {
        <ul>
          <li>Frontend: React + Typescript</li>
          <li>Graph rendering: Javascript + three.js</li>
          <li>Backend and filtering: Rust + SQL</li>
          <li>Database PostgreSQL</li>
          <li>Stock fetching orchestrator: Airflow</li>
        </ul>
        }
      />

      <AppSubject
        title="Foundation Response Predictor"
        subtitle="A deployed FE surrogate model, based on linear regression model to perform fast foundation settlement predictions."
        content=
        {
        <ul>
          <li>Frontend: React + Typescript</li>
          <li>API: Python + FastApi</li>
          <li>Machine Learning Library: Scikit-Learn</li>
          <li>FE Application: Plaxis 2D</li>
          <li>FE database creation: Python</li>
        </ul>
        }
      />
    </div>
  )
}