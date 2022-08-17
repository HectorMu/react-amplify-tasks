import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Input } from "@mui/material";
import toast from "react-hot-toast";
import { Auth } from "aws-amplify";
import { useNavigate, useLocation } from "react-router-dom";

export const ConfirmSignup = () => {
  const { state } = useLocation();
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
    if (!username || !code) return toast.error("All fields are required");
    const tLoading = toast.loading("Checking your code...");
    try {
      const res = await Auth.confirmSignUp(username, code);
      toast.success("Confirmed!", { id: tLoading });
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.message, { id: tLoading });
    }
  };

  const handleResendCode = async () => {
    if (!confirm.username) return toast.error("Username must be provided");

    const tLoading = toast.loading("Sending a new code...");
    try {
      const res = await Auth.resendSignUp(confirm.username);
      toast.success("Code sended!", { id: tLoading });
    } catch (error) {
      console.log(error);
      toast.error(error.message, { id: tLoading });
    }
  };
  useEffect(() => {
    if (state) {
      setConfirm({ ...confirm, username: state.username });
    }
  }, [state]);

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
              typography={"h5"}
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
                disabled={state !== null}
                onChange={handleChange}
                value={confirm.username}
                autoComplete={false}
              />
              <Input
                type="password"
                placeholder="Code"
                name="code"
                onChange={handleChange}
                value={confirm.code}
                autoComplete={false}
              />
            </div>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",

              alignContent: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Button
              type="submit"
              size="small"
              variant="outlined"
              color="success"
            >
              Confirm
            </Button>
            <Button
              onClick={handleResendCode}
              type="button"
              size="small"
              variant={"outlined"}
            >
              Resend code
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
};
