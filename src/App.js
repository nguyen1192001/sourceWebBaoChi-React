
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Admin from "./component/admin/Admin";
import User from "./User";
import TextEditor from "./component/journalist/TextEditor";
import { getUser } from "./Utils/Common";
import AnalyticVistitor_Chart from "./component/admin/AnalyticVistitor_Chart";





function App() {
  const account = getUser()
  return (
    <div>
     {/* <Admin></Admin> */}
      <Router>
        <Switch>
          <Route exact path="/" render={() => <User/>} />

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

