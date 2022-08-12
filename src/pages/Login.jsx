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

export const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) =>
    setLogin({ ...login, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = login;
    const tLoading = toast.loading("Verifying...");
    try {
      const res = await Auth.signIn(username, password);
      console.log(res);
      toast.success("Welcome", { id: tLoading });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: tLoading });
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
              Log in to continue
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
            </div>
          </CardContent>
          <CardActions sx={{ display: "flex", flexDirection: "column" }}>
            <Button type="submit" size="small">
              Log me in
            </Button>
            <Button
              type="button"
              onClick={() => navigate("/recover")}
              size="small"
            >
              Recover account
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
};
