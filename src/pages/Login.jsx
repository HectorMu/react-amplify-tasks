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
    if (!username || !password) return toast.error("All fields are required");

    const tLoading = toast.loading("Verifying...");
    try {
      const res = await Auth.signIn(username, password);
      console.log(res);
      toast.success("Welcome", { id: tLoading });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message, { id: tLoading });
    }
  };
  return (
    <Container
      sx={{
        marginTop: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Card sx={{ minWidth: 275, width: 600, boxShadow: 5 }}>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Typography
              sx={{ marginBottom: "20px" }}
              color="MenuText"
              align="center"
              typography={"h4"}
            >
              Log in
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
          <CardActions
            sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <Button type="submit" size="small" variant="contained" fullWidth>
              Log me in
            </Button>
            <Button
              type="button"
              onClick={() => navigate("/recover")}
              size="small"
              variant="outlined"
            >
              Recover account
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
};
