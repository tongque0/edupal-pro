import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "@/modules/stores";
import { ThemeProvider } from "@/components/theme-provider";
import App from  "@/layouts"
const root = document.getElementById("root")!;

const renderApp = () => {
  ReactDOM.createRoot(root).render(
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

renderApp();
