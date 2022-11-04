import {
    Outlet
} from "react-router-dom";

import Header from "./header";
import Footer from "./footer";

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
        <div className="flex flex-col items-center justify-between w-screen h-screen">
            <Header/>
            <main>
                <Outlet />
            </main>
            <Footer/>
        </div>
    );
}

export default Authentication;