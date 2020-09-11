# REACT GRAPHQL JWT BOILERPLATE

Init commit based on https://github.com/robertziel/simple_panel_react_client

## Quick start

Clone env_sample to .env for local development.

```
cp .env.example .env
```

Run using npm
```
npm install
npm start
```

## API FETCHERS
 A simple fetching hook allows you to focus on what is the most important. Only path, body and afterSuccess callback are required to define a request to API anywhere in the project. All necessary settings and errors handling are handled under the hood and kept DRY in one place. Check folder: `app/containers/ApiConnector/fetcher`

1. Use fetcher hook in your component:
```js
import useApiFetcher from 'containers/ApiConnector/fetcher';
const fetcher = useApiFetcher();
```
To make code clean it is better to use ***one fetcher per component***.

2. Now you can call fetch function in your component. **Available fetchers:**
  * `fetcher.graphql(options: { disableRetry, query, afterSuccess() })`

  ---

  More about passed params:

  * **options:**
    * **disableRetry**
      * it's better to ***set it true in forms***
      * ***false as default*** - if fetching error occurs the processing does not stop and fetch is reported to `connectionRefusedHandler.js` where ***it waits in queue to retry*** (check how it works by cutting your internet connection)
      * if set to __true__ the processing stops and fetch is reported to `connectionRefusedHandler.js` but it is ***not added to retry queue***
    * **path (required)**
    * **body**
    * **afterSuccess()**


3. You can check if ***fetcher is processing*** by the following code
  ```js
  fetcher.processing
  ```

  * You can use ready spinner component:

    ```js
    import FetchedContent from 'containers/FetchedContent';

    <FetchedContent
      processing={fetcher.processing}
      spinner={<CustomSpinner />}
    >
      <VisibleAfterProcessingSucceeded />
    </FetchedContent>
    ```


## AUTHENTICATION
* all authentication related containers are kept in `app/containers/_authPages`
* `app/containers/ApiConnector` is responsible for:
  * handling all requests to API
    * API URL is set in `.env` as `BACKEND_API_URL`
  * keeping signed in currentUser data and authenticationToken:
    * User data are not saved in cookies and application asks API to access them each time it initializes before render proper content
    * authenticationToken is saved in cookies
    * when any API request has authentication problem then:
      * authenticationToken is set to null
      * currentUser is set to null
      * when authenticationToken is null SignInPage is rendered ( handled in `app/containers/ApiConnector/index.js` )

## Docker

Repository contains basic docker setup. Depending on needs you can run app locally using both traditional `npm start` or `docker-compose`.

Docker compose is set up as default to run locally in **development** environment but can be easily changed for production needs.

1. Build:
```
docker-compose build
```

2. Start containers and check `localhost:3000`:
```
docker-compose up
```

3. Shut down containers:
```
docker-compose down
```

## FORMS
It's hard to make forms DRY, but we can adopt some conventions.
Example form can be found in `containers/_authPages/SignInPage/Form.js`
#### **Component:**
* keeps all form params in state and updates them on input's onChange event
* `onSubmit()` function should be responsible for any actions made after form is submitted, in most cases it will be API fetch [(check section API fetchers)](#api-fetchers)
* when using API fetcher:
  * Please check [**_API fetchers / Processing_**](#api-fetchers) section
  * pass `disableRetry: true` as config to fetcher so that form will not be submitted without user's knowledge

## Internet connection detection
* Location `containers/InternetConnectionDetector`
* `import { isOnline }` function to get current online/offline boolean value

## NOTIFICATIONS
* Based on https://www.npmjs.com/package/react-notifications-component
* path `app/containers/NotificationsSystem`
* notification functions should be defined in `notifications.js` files for each component they belong to separately, with following name format `function *Notify()` like `function randomNameNotify()`

## UI
* CSS based on https://www.styled-components.com/
  * Global style is defined in `app/styles/global-styles.js`
  * Constants with common variables like colors etc. are defined in `app/styles/constants.js`
  * Containers and components have own SCSS defined in `Wrapper.js`
* Basic commonly used elements like container, grid, h1 are defined in `app/components/_ui-elements` folder
  * The elements' components are based on:
    * https://material-ui.com
    * Custom components are defined in `app/components/_ui-elements/*Core` folder like `DivCore`
  * Each element should be accessible in `app/components/_ui-elements/index.js` as `import { Element1, Element2 } from components/_ui-elements` by exporting its styled version
  * Styled version is defined in `app/components/_ui-elements/*.js` file. For example `app/components/_ui-elements/Div.js`
    * Additional style version can be added like:
    ```javascript
      ${({ topLine }) =>
        topLine &&
        css`
          border-top: 4px solid ${colors.main}
        `
      }
    ```
    So that style version (in that case named `topLine`) can be used in element by adding it to props `<Div topLine />`
    * If https://material-ui.com element is styled please use the following convention (https://github.com/styled-components/styled-components/issues/1198#issuecomment-425650423)
    ```javascript
    /* eslint-disable react/jsx-props-no-spreading, indent */
    import React from 'react';
    // then define additional style called here as topLine
    const Button = styled(({ topLine, ...props }) => <ButtonCore {...props} />)`
      // some code
      // then define additional style as mentioned above
      ${({ topLine }) =>
        topLine &&
        css`
          border-top: 4px solid ${colors.main}
        `
      }
    `;
    ```


## TO DO:
* ~~BUG - `app/containers/ApiConnector/connectionRefusedHandler.js`:~~
  * ~~should refetch on click or after time, only if refetch queue is not empty (currently refetch is handled when notification disappears)~~
  * ~~Fix issue with queued refetch related to unmounted components, should be ignored~~
