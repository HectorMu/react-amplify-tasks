import { Container } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSession } from "../hooks/useSession";
import { useEffect, useState } from "react";
import { getGreet } from "../services/test";

export const Profile = () => {
  const [greeting, setGreeting] = useState("");
  const { user } = useSession();

  const fetchLambda = async () => {
    const greet = await getGreet();
    console.log(greet);
    setGreeting(greet);
  };
  useEffect(() => {
    fetchLambda();
  }, []);
  return (
    <Container sx={{ marginTop: "100px" }}>
      <Typography sx={{ fontSize: 20 }}>
        Welcome, <span style={{ fontWeight: "bolder" }}>{user?.username}</span>{" "}
      </Typography>
      <Accordion sx={{ marginTop: "30px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>My profile details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Email: {user?.attributes?.email}</Typography>
        </AccordionDetails>
        <AccordionDetails>
          <Typography>
            Phone: {user?.attributes?.phone ?? "No phone registered"}
          </Typography>
        </AccordionDetails>
      </Accordion>
      {greeting && (
        <Typography align="center" sx={{ marginTop: "30px" }}>
          {JSON.stringify(greeting)} A lambda function has sended a greet to
          you!
        </Typography>
      )}
    </Container>
  );
};
