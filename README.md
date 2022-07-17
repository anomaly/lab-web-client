# Lab - Standardised Web Client

Objectives:
- [X] Typescript based Create React App base project
- [X] Validated SSL without any other dependencies
- [ ] Internationalization support
- [X] Tailwind CSS based theming support
- [ ] Header `<head>` management for usability using [Helment](https://github.com/nfl/react-helmet)
- [ ] Meeting W3C AAA Accessibility
- [X] Proxy API from Docker container without any other dependencies 
- [ ] Establish a pattern for [monorepos](https://www.robinwieruch.de/javascript-monorepos/) for applications with multiple modules.
- [ ] End-to-end testing using [Microsoft Playwright](https://playwright.dev/)

Standard Libraries:
- [ ] Page routing with [React Router](https://reactrouter.com/)
- [ ] API calls with [autorest-typescript](https://github.com/Azure/autorest.typescript) or [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen)
- [ ] [Rich/Markdown editor](https://github.com/facebook/lexical)
- [ ] Loading skeletons
- [ ] React Hook Forms
- [ ] React Drop Zone for file upload 
- [ ] Research and recommend animation libraries

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

```
curl https://localhost:3000/api/openapi.json -o swagger.json
```

### [autorest]()

```
autorest --typescript --input-fileswagger.json --output-folder=autorest
```

Add your `autorest` client as a local package

```
yarn add file:./src/api/ar
```

[Using your client](https://github.com/Azure/autorest.typescript/blob/main/docs/client/readme.md)

### [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen)

```
openapi --input ./swagger.json --output ./generated
```

## Internationalization

## Structure

## End-to-end testing

## References

- [mkcert](https://github.com/FiloSottile/mkcert), by [Filippo Valsorda](https://filippo.io)
- [How to Setup HTTPS Locally with create-react-app](https://www.freecodecamp.org/news/how-to-set-up-https-locally-with-create-react-app/), by [Braedon Gough](https://twitter.com/bbbraedddon)

## License
Contents of this repository are licensed under the Apache 2.0 license.
