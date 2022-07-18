import {
    Outlet
} from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

/**
 * This provides a wrapper page for the authentication pages.
 * 
 * The routes are defined in the index page, where all pages are 
 * imported and wired up. The aim of this is to provide an overarching
 * template for the authentication pages.
 * 
 * Refer to the use of <Outlet> in the react-router documentation.
 * 
 * @returns {JSX.Element}
 */
function Authentication() {
    return(
        <div>
            <Header/>
            <main>
                <Outlet />
            </main>
            <Footer/>
        </div>
    );
}

export default Authentication;