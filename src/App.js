
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Admin from "./component/admin/Admin";
import User from "./User";
import TextEditor from "./component/journalist/TextEditor";
import { getUser } from "./Utils/Common";
import AnalyticVistitor_Chart from "./component/admin/AnalyticVistitor_Chart";
import Adversitiment from "./component/receive/Adversitiment";
import Argrrenent from "./component/receive/Argrrenent";
import AddAvertisment from "./component/receive/AddAvertisment";
import CreateNewAvertiments from "./component/receive/CreateNewAvertiments";
import CheckNew from "./component/admin/CheckNew"






function App() {
  const account = getUser()
  return (
    <div className="thaonguyen">
      {/* <Argrrenent/> */}
      {/* <Adversitiment /> */}
      {/* <Admin></Admin> */}
      <Router>
        <Switch>
          <Route exact path="/" render={() => <User />} />

          <Route exact path="/dmin" render={() => {
            if (account !== null) {
              return <Admin />
            }
            return <User />
          }} />

          <Route exact path="/advertising" render={() => {
            if (account !== null) {
              return <Adversitiment/>
            }
            return <User />
          }} />
          <Route exact path="/advertising/agreement/:id" render={(props) => {
            if (account.user.self_des == "receive") {
              return <Argrrenent {...props}/>
            }
            return <User />
          }} />
         
          <Route exact path="/advertising/add" render={() => {
            if (account.user.self_des == "receive") {
              return <AddAvertisment/>
            }
            return <User />
          }} />
          <Route exact path="/advertising/create" render={() => {
            if (account.user.self_des == "receive") {
              return <CreateNewAvertiments/>
            }
            return <User />
          }} />
          <Route exact path="/dmin/checkNew/:id" render={(props) => {
            if (account !== null) {
              return <CheckNew {...props}/>
            }
            return <User />
          }} />
          <Route exact path="/dmin/analytics" render={() => {
            if (account !== null) {
              return <AnalyticVistitor_Chart/>
            }
            return <User />
          }} />
        </Switch>
      </Router>

    </div>
  );

}


export default App;

