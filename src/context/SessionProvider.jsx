import { createContext, useEffect, useState } from "react";
import { Hub, Auth } from "aws-amplify";

export const Session = createContext();
//The AWS Hub listens when an user is logged, and it saves the cognito
//identity provider in the localStorage
const LAST_USER_LS =
  "CognitoIdentityServiceProvider.66k7aua0jc5laat47gn4g6bgbu.LastAuthUser";
export default function SessionProvider({ children }) {
  const lastUser = window.localStorage.getItem(LAST_USER_LS);
  console.log(lastUser);
  //If we have that item in localstorage, so there still is a user logged in
  //this is for persists the auth state on the same page, but a boolean as
  //session state doesnt work for us
  const [user, setUser] = useState(lastUser ? true : null);

  const AuthEventListener = async () => {
    Hub.listen("auth", async (data) => {
      const { payload } = data;
      if (payload.event === "signIn") {
        console.log(data);
        return setUser(payload.data);
      }
    });
  };

  //This function fetchs the current user using the Auth class from
  //aws-amplify, once fetched, we set the userState with the current user
  //this way we got all the user data globaly in our custom context
  const getCurrentUser = async () => {
    const currentUser = await Auth.currentAuthenticatedUser();
    setUser(currentUser);
  };

  AuthEventListener();

  useEffect(() => {
    //execute on every page load
    getCurrentUser();
  }, []);

  return (
    <Session.Provider value={{ user, setUser }}>{children}</Session.Provider>
  );
}
