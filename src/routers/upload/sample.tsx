import {
    Form
} from "react-router-dom";

import {
    QueryClient,
} from 'react-query';


import axios from "axios";


import { 
    getUploadUrl,
} from "api/file-uploads/file-uploads";

import {
    FileUploadResponse
} from "api/models"


export const action = (queryClient: QueryClient) =>
    async({ request } : any) => {
    const formData = await request.formData();
    console.log(formData);
    return true;
};


function SampleUpload() {

    const handleFileUpload = (e: any) => {
        e.preventDefault();
        const file = e.target[0].files[0];

        console.log(file);

        // File reader to read contents
        const reader = new FileReader();
        const fileContents = reader.readAsDataURL(file);

        getUploadUrl({
            fileName: file.name,
            mimeType: file.type,
            fileSize: file.size,
        }).then((res:any) => {
            console.log(res);
            // axios({
            //     method: 'PUT',
            //     url: res.data.presignedUploadUrl,
            //     data: fileContents,
            //     headers: {
            //         'Content-Type': file.type,
            //     }
            // }).then((res) => {
            //     console.log(res);
            // });

            const requestOptions:any = {
                method: 'PUT',
                headers: {
                    'Content-Type': file.type,
                },
                body: file,
            };
            fetch(res.data.presignedUploadUrl, requestOptions).then(
                (res) => {
                    console.log("here");
                }
            )

        }).catch((err) => {
            console.log(err);
        });
    }

    return(
        <div className="">
            <h1>
                Sample File Upload
            </h1>
            <form onSubmit={handleFileUpload} method="post" id="upload-file">
                <input type="file"></input>
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default SampleUpload;