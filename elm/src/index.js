import "./main.css";
import { Main } from "./Core/Main.elm";
import registerServiceWorker from "./registerServiceWorker";

Main.embed(document.getElementById("root"));

registerServiceWorker();
