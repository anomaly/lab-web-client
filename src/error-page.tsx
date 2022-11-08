import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Helmet } from "react-helmet";

/**
 * 
 * @returns JSX.Element
 */
function ErrorPage() {

    const error : any = useRouteError();
  
    return (
      <main id="error-page" className="flex flex-col items-center justify-center w-screen h-screen">
        <Helmet>
          <title>{error.statusText || error.message}</title>
        </Helmet>
        <h1 className="mb-10 text-6xl font-semibold">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>{error.statusText || error.message}</p>
      </main>
    );
}


export default ErrorPage;