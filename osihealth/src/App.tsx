import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./Service/store";
import { Provider } from "react-redux";
import AppRoutes from "./Routes";

const App: React.FC = () => {
  
  return (
    <Provider store={store}>
    <Router>
      <AppRoutes />
    </Router>
    </Provider>
  );
};

export default App;