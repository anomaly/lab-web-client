import { useRouteError } from "react-router-dom";
import { Helmet } from "react-helmet";

/**
 * 
 * @returns JSX.Element
 */
function ErrorPage() {

    const error = useRouteError();
    console.error(error);
  
    return (
      <div id="error-page">
        <Helmet>
          <title>Error</title>
        </Helmet>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
        </p>
      </div>
    );
}


export default ErrorPage;