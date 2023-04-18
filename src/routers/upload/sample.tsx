import {
    Form
} from "react-router-dom";

import {
    QueryClient,
} from 'react-query';


export const action = (queryClient: QueryClient) =>
    async({ request } : any) => {
    const formData = await request.formData();
    console.log(formData);
};


function SampleUpload() {
    return(
        <div className="">
            <h1>
                Sample File Upload
            </h1>
            <Form method="post" id="upload-file">
                <input type="file"></input>
                <button type="submit">Upload</button>
            </Form>
        </div>
    );
}

export default SampleUpload;