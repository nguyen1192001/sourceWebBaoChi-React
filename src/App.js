
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Admin from "./component/admin/Admin";
import User from "./User";
import { getUser } from "./Utils/Common";



function App() {
  const account = getUser()
  let history = useHistory();
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <User />} />

          <Route exact path="/dmin" render={() => {
            if (account !== null) {
              return <Admin />
            }
            return <User />
          }} />
        </Switch>
      </Router>

    </div>
  );

}


export default App;
