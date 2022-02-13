import { AssemblyLine } from './components';

function App() {
  return (
    <div id="app">
      <AssemblyLine
        stages={[
          "Idea",
          "Development",
          "Testing",
          "Deployment"
        ]}
      />
    </div>
  );
}

export default App;
