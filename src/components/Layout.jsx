import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSession } from "../hooks/useSession";
import { Auth } from "aws-amplify";

const Layout = ({ children }) => {
  const { user, setUser } = useSession();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await Auth.signOut();
    setUser(null);
    navigate("/login");
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              onClick={() => navigate("/")}
              component="div"
              sx={{ flexGrow: 1, cursor: "pointer" }}
            >
              Tasks
            </Typography>
            {!user ? (
              <>
                <Button onClick={() => navigate("/login")} color="inherit">
                  Login
                </Button>
                <Button onClick={() => navigate("/signup")} color="inherit">
                  Signup
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => navigate("/Tasks")} color="inherit">
                  My Tasks
                </Button>
                <Button onClick={handleLogout} color="inherit">
                  Logout
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {children}
      <Toaster />
    </div>
  );
};

export default Layout;
