import { Container } from "@material-ui/core";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Header from "./containers/Header";
import HomerPage from "./containers/HomePage/index";

function App() {
  return (
    <Router>
      <Switch>
        <Container maxWidth="lg">
          <Header></Header>
          <Route path="/">
            <HomerPage />
          </Route>
        </Container>
      </Switch>
    </Router>
  );
}

export default App;
