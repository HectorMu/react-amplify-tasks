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

export const Recover = () => {
  const navigate = useNavigate();
  const [onConfirm, setOnConfirm] = useState(false);
  const [recover, setRecover] = useState({
    username: "",
    code: "",
    password: "",
  });

  const handleChange = (e) =>
    setRecover({ ...recover, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, code, password } = recover;

    const tLoading = toast.loading("Loading...");
    if (!onConfirm) {
      try {
        if (!username)
          return toast.error("Username is required", { id: tLoading });
        const res = await Auth.forgotPassword(username);
        console.log(res);
        toast.success("Code sended", { id: tLoading });
        setOnConfirm(true);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong", { id: tLoading });
      }
    } else {
      try {
        if (!username || !code || !password)
          return toast.error("All fields are required", { id: tLoading });
        const res = await Auth.forgotPasswordSubmit(username, code, password);
        console.log(res);
        toast.success("New password saved", { id: tLoading });
        navigate("/");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong", { id: tLoading });
      }
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
              {onConfirm
                ? "We sended a confirmation code to your email"
                : " Enter your username"}
            </Typography>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Input
                disabled={onConfirm}
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                autoComplete={"none"}
              />
              {onConfirm && (
                <>
                  <Input
                    type="text"
                    placeholder="Confirmation code"
                    name="code"
                    onChange={handleChange}
                    autoComplete={"none"}
                  />
                  <Input
                    type="password"
                    placeholder="New password"
                    name="password"
                    onChange={handleChange}
                    autoComplete={"none"}
                  />
                </>
              )}
            </div>
          </CardContent>
          <CardActions sx={{ display: "flex", flexDirection: "column" }}>
            <Button type="submit" size="small">
              {onConfirm ? "Save new password" : "Send"}
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
};
