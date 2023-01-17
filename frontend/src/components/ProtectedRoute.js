import { Redirect, Route } from "react-router-dom";
import { React} from "react";


function ProtectedRoute({ loggedIn, children, ...props }) {

  return (
    <Route {...props}>
      {loggedIn ? children : <Redirect to="/sign-in" />}
    </Route>
  );
}

export default ProtectedRoute;

