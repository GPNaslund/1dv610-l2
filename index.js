import App from "./app/controller/App.js";
import DefaultAppFactory from './app/controller/DefaultAppFactory';

document.addEventListener("DOMContentLoaded", () => {
  const factory = new DefaultAppFactory();
  const app = new App(factory);
});
