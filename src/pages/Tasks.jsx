import {
  Box,
  Button,
  Container,
  Input,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import toast from "react-hot-toast";
import { useSession } from "../hooks/useSession";
import { TaskList } from "../components/TaskList";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
};

const Tasks = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newTask, setNewtask] = useState({ title: "", content: "" });

  const { user } = useSession();

  const handleChange = (e) =>
    setNewtask({ ...newTask, [e.target.name]: e.target.value });

  const toggleModal = () => setOpen(!open);

  const getTasks = async () => {
    setLoading(true);
    try {
      const data = await API.get("test", "/tasks", {
        headers: {
          "Content-Type": "application/json",
          Authorization: user.signInUserSession.idToken.jwtToken,
        },
      });

      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tLoading = toast.loading("Saving task...");
      await API.post("test", "/tasks/save", {
        body: { newTask },
        headers: {
          "Content-Type": "application/json",
          Authorization: user.signInUserSession.idToken.jwtToken,
        },
      });
      toast.success("Task saved", { id: tLoading });
      toggleModal();
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, [user]);
  return (
    <>
      <Container sx={{ marginTop: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography typography={"h4"} color={"black"}>
            My tasks
          </Typography>
          <Button
            onClick={toggleModal}
            variant="outlined"
            sx={{ fontWeight: "bold" }}
          >
            New task
          </Button>
        </div>
      </Container>

      <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            onSubmit={handleSubmit}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create task
            </Typography>
            <Input
              placeholder="Task title"
              name="title"
              onChange={handleChange}
            />
            <Input
              placeholder="Task content"
              name="content"
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="outlined"
              sx={{ fontWeight: "bold" }}
            >
              Save
            </Button>
          </form>
        </Box>
      </Modal>
      {tasks.length > 0 && !loading && (
        <TaskList tasks={tasks} loading={loading} getTasks={getTasks} />
      )}
    </>
  );
};

export default Tasks;
