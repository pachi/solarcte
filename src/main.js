import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";

import { set_panic_hook, set_log_hook } from "wasm-envolventecte";

set_panic_hook();
set_log_hook("warn");

ReactDOM.render(<App />, document.getElementById("root"));
