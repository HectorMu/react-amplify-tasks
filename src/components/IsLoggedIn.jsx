import { Navigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";

//View is the component to render
const IsLoggedIn = ({ view: View }) => {
  //Extract the user from the Session global context
  const { user } = useSession();

  //If there is not a user logged in return to login page
  if (!user) return <Navigate to={"/login"} />;

  //If user is logged in return the view requested
  return <View />;
};

export default IsLoggedIn;
