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

export const ConfirmSignup = () => {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState({
    username: "",
    code: "",
  });

  const handleChange = (e) =>
    setConfirm({ ...confirm, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, code } = confirm;
    try {
      const res = await Auth.confirmSignUp(username, code);
      console.log(res);
      toast.success("Confirmed!");
      navigate("/login");
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
              We sended you a confirmation code to your email
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
                placeholder="Code"
                name="code"
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button type="submit" size="small">
              Confirm
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
};
