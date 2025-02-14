import Editor from "./components/Editor";
import { ErrorProvider } from "./contexts/ErrorContext";

function App() {
  return (
    <ErrorProvider>
      <div className="App">
        <Editor />
      </div>
    </ErrorProvider>
  );
}

export default App;
