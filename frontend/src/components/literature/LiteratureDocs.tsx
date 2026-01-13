
export default function LiteratureDocs() {
  return(
    <div>
      <h2>The Literature App Documentation</h2>

      <p>The literature app is a simple tool that allows the user to fetch documents based on queries.</p>

      <p>For each type, a request is sent to the backend with the input string. The backend runs that input string as an SQL query to fetch all items that contains the input string, from title, author and keywords.</p>

      <p>The database is postgres and the backend makes the request to the database via sqlx.</p>

      <h3>Limited access with user login</h3>
      Only a limited number of articles are available with user login. Also document upload is not available without user login.
    </div>
  )
}