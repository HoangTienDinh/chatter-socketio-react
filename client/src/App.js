import React from "react";
import { BroserRouter as Router, Route } from "react-router-dom";
import Join from "./components/Join";
import Chat from "./components/Chat";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" exact component={Chat} />
    </Router>
  );
}

export default App;