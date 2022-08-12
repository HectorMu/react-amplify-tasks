import { Routes, Route } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import Layout from "./components/Layout";
import { Amplify } from "aws-amplify";
import config from "./aws-exports";
import SessionProvider from "./context/SessionProvider";
import { ConfirmSignup } from "./pages/ConfirmSignup";
import IsLoggedIn from "./components/IsLoggedIn";
import { Recover } from "./pages/Recover";

Amplify.configure(config);

function App() {
  return (
    <SessionProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<IsLoggedIn view={Profile} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/confirm-signup" element={<ConfirmSignup />} />
          <Route path="recover" element={<Recover />} />
        </Routes>
      </Layout>
    </SessionProvider>
  );
}

export default App;
