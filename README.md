# Lab - Standardised Web Client

Objectives:
- [X] Typescript based Create React App base project
- [X] Validated SSL without any other dependencies
- [ ] Internationalization support
- [ ] Tailwind CSS based theming support
- [ ] Meeting W3C AAA Accessibility
- [X] Proxy API from Docker container without any other dependencies 

Standard Libraries:
- [ ] Page routing with React Router
- [ ] API calls with [autorest-typescript](https://github.com/Azure/autorest.typescript) or [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen)
- [ ] [Rich/Markdown editor](https://github.com/facebook/lexical)
- [ ] Loading skeletons
- [ ] React Hook Forms
- [ ] React Drop Zone for file upload 


# Development

`HTTPS=true yarn start`

## SSL during Development

[mkcert](https://github.com/FiloSottile/mkcert)

Install mkcert tool
```sh
$ brew install mkcert
```
Install nss (only needed if you use Firefox)
```sh
$ brew install nss
```

Setup mkcert on your machine (creates a CA)
```
$ mkcert -install
```

`package.json` looks like this:
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

`package.json` is 
```json
  "scripts": {
    "start": "HTTPS=true SSL_CRT_FILE=./.cert/cert.pem SSL_KEY_FILE=./.cert/key.pem react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

## React Proxy

http-proxy-middleware
https://create-react-app.dev/docs/proxying-api-requests-in-development/
https://www.npmjs.com/package/http-proxy-middleware


# References

- [mkcert](https://github.com/FiloSottile/mkcert), by [Filippo Valsorda](https://filippo.io)
- [How to Setup HTTPS Locally with create-react-app](https://www.freecodecamp.org/news/how-to-set-up-https-locally-with-create-react-app/), by [Braedon Gough](https://twitter.com/bbbraedddon)