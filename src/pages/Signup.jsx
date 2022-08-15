import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Input } from "@mui/material";
import toast from "react-hot-toast";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { API } from "aws-amplify";

export const Signup = () => {
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    username: "",
    password: "",
    email: "",
  });
  const handleChange = (e) =>
    setSignup({ ...signup, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, email } = signup;
    try {
      const res = await Auth.signUp({
        username,
        password,
        attributes: { email },
      });

      const newUser = {
        id: res.userSub,
        username,
        email,
      };

      const registerRes = await API.post("test", "/register", {
        body: { userData: newUser },
        headers: { "Content-Type": "application/json" },
      });

      console.log(registerRes);
      toast.success("Registered");
      navigate("/confirm-signup");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Container
      sx={{ marginTop: "50px", display: "flex", justifyContent: "center" }}
    >
      <Card sx={{ minWidth: 275, maxWidth: 400 }}>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Create an account
            </Typography>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Input
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
              />
              <Input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
              <Input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button type="submit" size="small">
              Sign me up
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
};
