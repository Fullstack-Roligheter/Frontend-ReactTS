import "./App.css";
import AppRouter from "./routes";

const App: React.FC = () => {
  window.onbeforeunload = function (e) {
    window.onunload = function () {
      window.localStorage.isMySessionActive = "false";
    }
    return undefined;
  };
  window.onload = function () {
    window.localStorage.isMySessionActive = "true";
  };

  return <AppRouter />;
};

export default App;
