import React from "react";
import { BroserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path='/' exact component={Join} />
      <Route path='/chat' exact component={Chat} />
    </Router>
    );
}

export default App;
