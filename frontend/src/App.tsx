import { Container } from "@material-ui/core";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./containers/Header";
import HomerPage from "./containers/HomePage/index";
import LoginPage from "./containers/Login/index";

function App() {
  return (
    <Router>
      <Switch>
        <Container maxWidth="lg">
          
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route path="/weather/:type?">
            <Header></Header>
            <HomerPage />
          </Route>
        </Container>
      </Switch>
    </Router>
  );
}

export default App;
