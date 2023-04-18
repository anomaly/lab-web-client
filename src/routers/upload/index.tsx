import {
    Outlet
} from "react-router-dom";

function UploadIndex() {
    return(
        <div className="flex flex-col items-center justify-between w-screen h-screen">
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default UploadIndex;