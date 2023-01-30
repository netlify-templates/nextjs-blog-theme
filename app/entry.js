// This is the entry point to your app.

// It's a good place to execute one-time side effects, such as initializing the React root,
// because it will never get fast-refreshed in development mode.

// react and react-dom are installed by default, so we can just import them.
import * as react from 'react'
import * as reactDom from 'react-dom/client'
// We import with .js extension here, but Reflame supports .js and extensionless 
// import specifiers through import maps.
//
// Also note we're using / to refer to the base directory (/app in this case).
// This is just how absolute paths on the web works natively.
import { Root } from '/root.js'

export const init = () => {
  reactDom
    .createRoot(document.getElementById('root'))
    .render(
      <react.StrictMode>
        <Root />
      </react.StrictMode>
    )
}