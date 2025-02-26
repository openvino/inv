import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThirdwebProvider } from "thirdweb/react";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ThirdwebProvider>
			<App />
			<ToastContainer />
		</ThirdwebProvider>
	</StrictMode>
);
