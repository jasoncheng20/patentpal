import "./App.css";
import Layout from "./hoc/Layout";
import GraphBuilder from './components/GraphBuilder/GraphBuilder'

const App = () => {
  return (
    <div className="App">
      <Layout><GraphBuilder/></Layout>
    </div>
  );
};

export default App;


