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
- [ ] [Loading skeletons](https://github.com/buildo/react-placeholder)
- [ ] DatePicker component, Airbnb makes available their [date component](https://airbnb.io/projects/react-dates/)
- [ ] [Rich/Markdown editor](https://github.com/facebook/lexical)
- [X] React Hook Forms
- [ ] React Drop Zone for file upload 
- [ ] Research and recommend animation libraries, e.g Framer Motion
- [ ] [React Phone number input](react-phone-number-input/)
- [ ] Date Time parsing
- [ ] Addition hooks from [rooks](https://www.npmjs.com/package/rooks) 
- [ ] [Headless UI](https://headlessui.com/), from the makers of Tailwind CSS

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
```bash
$ brew install mkcert
```
Install [nss](https://firefox-source-docs.mozilla.org/security/nss/index.html) (this is only needed if you use Firefox)
```bash
$ brew install nss
```

Setup mkcert on your machine (this register it as a certificate authority)
```bash
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
```bash
mkdir -p .cert
```

Generate the certificate (ran from the root of this project)
```bash
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
## Routing, Data Loading and State Management

Most React developers start off using a `Router` library and in the more recent times use a `Context` to store the state of the user interface and in many instances the asynchronous data (i.e from a remote source, typically an API). As we trying and refactor the application code to separate user interface elements from data state, we often end up with issues like Deduping multiple requests (where the same request end point is called multiple times, mostly due to the state being re-initialised on paints).

Until recently these have been three separate topics. While React does not have an opinion on a solution for this, recent developments like React Router introducing data loading in `v6.4` has had us revisit all three components in unison. 

> React Router is about *when*, data caching libs are about *what*. - [Ryan Florence](https://twitter.com/ryanflorence/status/1561731634419773447?s=20&t=Jn92zsNQwOOdKEp383-kyg)

As we apply our templates to larger problems, we must now think of the most efficient patterns to handle these complex use cases. To this effect we:

- Separate application UI state and asynchronous data state
- Use `react-query` to handle caching, deduping, reflection of data
- Use `react-router` and `react-query` in harmony
- Use `orval` to generate the api client that can be used by `react-query`

### Routing and data loading

React Router 6.4 changes the way it's configured and introduces data loading, the two major concepts to take note of are:

- [Loaders](https://reactrouter.com/en/main/route/loader), which are async functions fired before the route is rendered
- [Actions](https://reactrouter.com/en/main/route/action), which are async function fired from a `<Form>`

This is in attempt to provide a HTML + HTTP like with `react-router` doing the async work.

A `loader` or an `action` can throw an exception which signals the `Router` to load the `errorElement`, which is meant to be a fallback components for error states.

The following is a code extract to how `react-router` is configured with `react-query`, it will become clear how we are using the two libraries together. 

First of all note that the router is created using the [createBrowserRouter](https://reactrouter.com/en/main/routers/create-browser-router) method which uses the DOM History API. Children are passed as an array to the routes, and it's behaviour is that of when we nested `<Route>` and used an `<Outlet>` in the parent container.

```ts
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'

import { ReactQueryDevtools } from 'react-query/devtools'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    element: <Authentication />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "otp",
        element: <OTP/>
      }
    ]
  }
]);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  </React.StrictMode>
);
```

The `QueryClientProvider` wraps the entire application. `<ReactQueryDevtools>` injects the developer tool into the application for `react-query` and it stripped away in production builds.

The `queryClient` is used to invalidate the cache, we will talk about in the next section.

Further reading:
- [React Query meets React Router](https://tkdodo.eu/blog/react-query-meets-react-router)

### API Clients

[Orval](https://orval.dev/overview)

### State Management

While most traditional state management libraries are great for working with client state, they are not so great at working with async or server state. This is because server state is totally different. For starters, server state:

- Is persisted remotely in a location you do not control or own
- Requires asynchronous APIs for fetching and updating
- Implies shared ownership and can be changed by other people without your knowledge
- Can potentially become "out of date" in your applications if you're not careful

Once you grasp the nature of server state in your application, even more challenges will arise as you go, for example:

- Caching... (possibly the hardest thing to do in programming)
- Deduping multiple requests for the same data into a single request
- Updating "out of date" data in the background
- Knowing when data is "out of date"
- Reflecting updates to data as quickly as possible
- Performance optimizations like pagination and lazy loading data
- Managing memory and garbage collection of server state
- Memoizing query results with structural sharing

> **Reference**: [Motivation](https://react-query-v3.tanstack.com/overview#motivation) from the `react-query` documentation.

We've all comes across these issues in React, or you eventually will. Tanner Linsley's presentation [React Query: It’s Time to Break up with your "Global State"!](https://youtu.be/seU46c6Jz7E) gives an overview of these issues and how `react-query` goes a long way to address them.

`react-query` handles the following use cases rather well:
- Background fetching
- Parallel queries
- Window focus refetching
- Query retries
- Paginated queries


Developer tools
```ts
 import { ReactQueryDevtools } from 'react-query/devtools'
```

[Example](https://tanstack.com/query/v4/docs/examples/react/react-router) of how to Router and Query together.

### Putting it all together


### Thoughts on naming, using operation IDS

You'll notice the names of the autogenerated methods to be `meAuthMeGet`,  which is not ideal for readability. This is a result of of what the Open API spec calls `operationId` which is used to generate the method name. The `operationId` is a unique identifier for the operation and is used to generate the method name. The `operationId` is not required in the Open API spec, but it is recommended to provide one.

Our Python server lab outlines how to configure the `operationId` in FastAPI, which greatly improves the readability of the generated clients. The evolved templates is able to name things based on the function names, so long as your api function names are pretty, so will your documentation 😀.

> Wisdom: Write code to be read

## Internationalization

Even thought your application may never be used across regions (highly unlikely if you are building a global product), it's still a good idea to internationalize your application. This is because it's a good practice to get into and it's a good way to learn about the tools and techniques. It is also easier to internationalize your application from the start than to do it later.

Things to consider are:
- The interfaces lay themselves towards right-to-left languages
- Ability to provide multiple locales (even English varies between countries like USA and the UK)

There are several providers like [Locaize](https://locize.com) that help with the translation services.

## Structure

The following is an evolving conversation. While there's no official pattern for folder structures, what we have obtained from reading various articles from experienced developers is that project structures are an evolving idea, in general we follow these principles:

- `src/components`, contain components that are truly reused around the project, if there's a particular component tied to a view then it makes more sense to keep it within the view folder.
- `src/views`, contains views for the application. These should be grouped by function e.g authentication, dashboard.

## S3 Wisdom

These remarks are made around Linode's implementation of an object store which is S3 compatible. These are hopefully translatable across any S3 compatible service.

Object store bucket names are unique in a region, so it's best to come up with a pattern (e.g FQDN) so we never conflict with users around world.

This should ideally be done as part of a CI/CD process, but the commands are nice to have for reference and are handy for development builds. We encourage that you keep the bucket related secrets in an `.env` file, this translates directly into storing this a CI/CD environment.

> Note: the keys are secrets and should never be versioned, it's also advisable to cycle these keys from time to time.

```ini
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

## End-to-end and API testing

We use [Microsoft Playwright](https://playwright.dev) for end-to-end and API testing, including the use of Github actions to automate testing on pull requests. While we don't intend to replicate all the documentation here, the intent is to maintain information about the portions of the tool that we use and how we think it's best configured.

To configure Playwright for the project use:
```bash
yarn create playwright
```

> Follow the prompts to complete installation, we generally use the default values

To run the headless tests use:

```bash
npx playwright test
```

and to view reports (this will end up running a web server with with the reports displayed as a site):

```bash
npx playwright show-report
```

### Recording new tests

```bash
npx playwright codegen playwright.dev
```

## Developer Tools

Anomaly primarily uses [Visual Studio Code](https://code.visualstudio.com) as the standard code editor. Here are some useful plugins that has proven useful for our development team:

- [GitHub co-pilot](https://copilot.github.com) - AI assisted code completion
- [GitLess](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) - supercharged Git workflows
- [Headwind](https://marketplace.visualstudio.com/items?itemName=heybourn.headwind) - An opinionated class sorter for Tailwind CSS, ensures that every developers classes are in the same order

## References

- [mkcert](https://github.com/FiloSottile/mkcert), by [Filippo Valsorda](https://filippo.io)
- [How to Setup HTTPS Locally with create-react-app](https://www.freecodecamp.org/news/how-to-set-up-https-locally-with-create-react-app/), by [Braedon Gough](https://twitter.com/bbbraedddon)

Articles:

- [Implementing Skeleton Screens In React](https://www.smashingmagazine.com/2020/04/skeleton-screens-react/) by [Blessing Krofegha](https://twitter.com/beveloper)

## License
Contents of this repository are licensed under the Apache 2.0 license.
