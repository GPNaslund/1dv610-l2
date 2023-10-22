const DEV_MODE = true;

import App from "./app/controller/App.js";
import DefaultAppFactory from './app/controller/DefaultAppFactory';

document.addEventListener("DOMContentLoaded", () => {
  try {
    const factory = new DefaultAppFactory(DEV_MODE);
    const app = new App(factory);
  } catch (e) {
    console.log(e.message)
    console.error(e)
  }
});
