# Lab - Standardised Web Client

Objectives:
- [X] Typescript based Create React App base project
- [X] Validated SSL without any other dependencies
- [ ] Internationalization support
- [X] Tailwind CSS based theming support
- [ ] Header `<head>` management for usability using [Helmet](https://github.com/nfl/react-helmet)
- [ ] Meeting W3C AAA Accessibility
- [X] Proxy API from Docker container without any other dependencies 
- [ ] Establish a pattern for [monorepos](https://www.robinwieruch.de/javascript-monorepos/) for applications with multiple modules.
- [ ] End-to-end testing using [Microsoft Playwright](https://playwright.dev/)
- [X] API calls with [autorest-typescript](https://github.com/Azure/autorest.typescript) or [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen)

Standard Libraries and UI components:
- [X] Page routing with [React Router](https://reactrouter.com/), a industry leading Router components (this is not an issue for GatsbyJS or NextJS as they ship their own)
- [ ] [Headless UI](https://headlessui.com/), from the makers of Tailwind CSS
- [ ] [Loading skeletons](https://github.com/buildo/react-placeholder)
- [ ] DatePicker component, Airbnb makes available their [date component](https://airbnb.io/projects/react-dates/)
- [ ] [Rich/Markdown editor](https://github.com/facebook/lexical)
- [X] React Hook Forms
- [ ] React Drop Zone for file upload 
- [ ] Research and recommend animation libraries, e.g Framer Motion
- [ ] [React Phone number input](react-phone-number-input/)

As a general rule of thumb, we want to avoid tooling in anything we don't need to. Unless absolutely necessary we use yarn to run any scripts e.g generating OpenAPI clients.
## Developing the client

The React app is configured to run with a signed SSL certificate and proxy the FastAPI application running in the development container.

Once setup you can run the development servers via:

```bash
yarn start
```

> React uses the `HTTPS` environment variable to run run in secure mode `HTTPS=true yarn start`, we make a more permanent change in `package.json` to save us having to do this manually.

## SSL during Development

The intent here is run SSL (which is as close to development as possible) but without needing to introduce yet another tool (e.g a reverse proxy).

[mkcert](https://github.com/FiloSottile/mkcert) allows us to provision a SSL certificate for our development environment.

Install mkcert via `brew`:
```sh
$ brew install mkcert
```
Install nss (this is only needed if you use Firefox)
```sh
$ brew install nss
```

Setup mkcert on your machine (this register it as a certificate authority)
```
$ mkcert -install
```

Next we modify the `start` script to use SSL, this saves us having to set the `HTTPS` environment variable manually:

```json
"scripts": {
    "start": "HTTPS=true react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

Create .cert directory if it doesn't exist
```
mkdir -p .cert
```

Generate the certificate (ran from the root of this project)
```
mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem "localhost"
```

Lastly update `package.json` so the `start` script can use the generated certificate:
```json
  "scripts": {
    "start": "HTTPS=true SSL_CRT_FILE=./.cert/cert.pem SSL_KEY_FILE=./.cert/key.pem react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

## Using React to proxy the API

Our intention is to keep things simple and not introduce tools unless it's absolutely necessary. CRA provides a guide to [proxying](https://create-react-app.dev/docs/proxying-api-requests-in-development/) APIs calls. There's a simple setup and then a more complex one that uses [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware).

We need to use the later for so we can configure stripping the prefix from the API calls. This is necessary because of the way our FastAPI application is configured in the docker container. You can read about this in the [server labs](https://github.com/anomaly/labs-python-server).

In principle what we are doing is stripping the `/api` prefix from the calls i.e `/api/ext/echo` is proxied to `/ext/echo` on `http://localhost:8000`.

`http-proxy-middleware` provides a `pathRewrite` option to achieve this, this is detailed in their documentation, the following is an example that works for us:

```javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8000/',
      changeOrigin: true,
      pathRewrite: {'^/api' : ''} // Removes the prefix so the container responds properly
    })
  );
};
```

## Generating API Clients

FastAPI has a few recommendations on [how to generate clients](https://fastapi.tiangolo.com/advanced/generate-clients/?h=) for the API. The following are options that we hve narrowed down to and provide usage guidelines for. An extremely central aim in choosing a client API generator is code readability, this is achieved by naming methods well on the server and configuring the client to generate sensible names.

> Code readability greatly improves developer productivity

You will require the `openapi.json` file which you can fetch using `cURL`:
```
curl https://localhost:3000/api/openapi.json -o src/api/openapi.json
```

`package.json` contains a script called `fetch-openapi` which you can use to the run the above command.

> autorest requires you to provide a fully qualified name for the API


The labs project has evaluated the following client API generators:

### [autorest](https://github.com/azure/autorest.typescript)

Part of the Microsoft Azure SDK for TypeScript, autorest provides client libraries for many languages including Python. The Typescript client. `autorest can be installed via `npm` to be available globally:

```
npm install -g autorest
```

following this you should be able to generate a client using `autorest` as follows, use the `--typescript` flag to generate a Typescript client:

```
autorest --typescript --input-file=src/api/openapi.json --output-folder=src/api/ar
```
`package.json` contains a script called `generate-ar` which you can use to the run the above command.


`autorest` generates an `npm` package (which is designed to be published), add your `autorest` client as locally using:

```
yarn add file:./src/api/ar
```

Here's a basic example of calling the `/auth/me` endpoint:

```typescript
  // Autoreset client demo
  const labsApi: LabsApi = new LabsApi();

  const arCallme = async () => {
    labsApi.get.meAuthMeGet().then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  };
```

> For further details see their [using your client](https://github.com/Azure/autorest.typescript/blob/main/docs/client/readme.md) guide.

### [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen)

`openapi-typescript-codegen` on the other hand is installed at the project level:

```
yarn add openapi-typescript-codegen --dev
```

You can use a `yarn` script to generate the client. The `--name` parameter is used to provide a name for the client which you use to import the client:

```
openapi --input src/api/openapi.json --output src/api/otc --name LabsApiClient
```
`package.json` contains a script called `generate-otc` which you can use to the run the above command.

A sample usage would look as following:

```typescript
  import { LabsApiClient } from 'api/otc';

  // OTC client demo
  const otcClient = new LabsApiClient();

  const otcCallMe = async () => {
    otcClient.auth.getMeAuthMeGet().then(res => { 
      console.log(res);
    }).catch(err => { 
      console.log(err);
    });
  };
```

> When you initialise the client you can provide a `BASE` URL prefix for your calls, this can be dynamically provided based on your deployed domain where relevant.

## Internationalization

## Structure

The following is an evolving conversation. While there's no official pattern for folder structures, what we have obtained from reading various articles from experienced developers is that project structures are an evolving idea, in general we follow these principles:

- `src/components`, contain components that are truly reused around the project, if there's a particular component tied to a view then it makes more sense to keep it within the view folder.
- `src/views`, contains views for the application. These should be grouped by function e.g authentication, dashboard.

### React Router configuration

`<Router>` in index page


## S3 related wisdom

This should ideally be done as part of a CI/CD process, but the commands are nice to have for reference and are handy for development builds.

We encourage that you keep the bucket related secrets in an `.env` file, this translates directly into storing this a CI/CD environment. 

> Note: the keys are secrets and should never be versioned, it's also advisable to cycle these keys from time to time.

```
ACCESS_KEY=LEGG.....
SECRET_KEY=qUuXn.....
BUCKET_FQDN=lab-web-client.ap-south-1.linodeobjects.com
BUCKET_NAME=lab-web-client
BUCKET_REGION_FQDN=ap-south-1.linodeobjects.com
```

You will need to prepare the bucket to serve static files, the `s3cmd` can help you with this:

```bash
export $(cat .env) && s3cmd 
  --access_key=$ACCESS_KEY 
  --secret_key=$SECRET_KEY 
  --host=$BUCKET_REGION_FQDN 
  --host-bucket=$BUCKET_FQDN 
  ws-create 
  --ws-index=index.html 
  --ws-error=index.html 
  s3://$BUCKET_NAME/
```

> This is a one time process, following this step the bucket should be ready to serve files.

Once you've built client you can use a tool like `s3cmd` to synchronise the files to the S3 bucket.

```bash
export $(cat .env) && s3cmd 
  --access_key=$ACCESS_KEY 
  --secret_key=$SECRET_KEY 
  --host=$BUCKET_REGION_FQDN 
  --host-bucket=$BUCKET_FQDN 
  sync 
  --no-mime-magic 
  --delete-removed
  --delete-after
  --acl-public 
  build/* 
  s3://$BUCKET_NAME/
```

Buckets are also required to be empty before you can drop them from the provider:

```bash
export $(cat .env) && s3cmd 
  --access_key=$ACCESS_KEY 
  --secret_key=$SECRET_KEY 
  --host=$BUCKET_REGION_FQDN 
  --host-bucket=$BUCKET_FQDN 
  del 
  --recusrive 
  --force
  s3://$BUCKET_NAME/
```

If you are using an alternate Object Store like one provided by [Linode](), then you might need to provide additional context by changing the suffix values of the buckets. For example Linode buckets are suffixed with `linodeobjects.com` and the region is suffixed with the region name.

Create a file called `.s3cfg` in your home directory with the following values:
```ini
website_endpoint=http://%(bucket)s.website-ap-south-1.linodeobjects.com
```

this will result in the `cli` outputting the correct URL for the bucket.

```
Bucket s3://lab-web-client/: Website configuration
Website endpoint: http://lab-web-client.website-ap-south-1.linodeobjects.com
Index document:   index.html
Error document:   index.html
```

> *Note:* while the bucket's FQDN is `lab-web-client.ap-south-1.linodeobjects.com` to serve the web site you must use the generated address of `lab-web-client.website-ap-south-1.linodeobjects.com`. The FQDN is used to serve the context of the bucket _not_ a site.

## End-to-end testing

## References

- [mkcert](https://github.com/FiloSottile/mkcert), by [Filippo Valsorda](https://filippo.io)
- [How to Setup HTTPS Locally with create-react-app](https://www.freecodecamp.org/news/how-to-set-up-https-locally-with-create-react-app/), by [Braedon Gough](https://twitter.com/bbbraedddon)

Articles:

- [Implementing Skeleton Screens In React](https://www.smashingmagazine.com/2020/04/skeleton-screens-react/) by [Blessing Krofegha](https://twitter.com/beveloper)

## License
Contents of this repository are licensed under the Apache 2.0 license.
