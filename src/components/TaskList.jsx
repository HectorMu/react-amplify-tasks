import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Input,
  Modal,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { API } from "aws-amplify";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export const TaskList = ({ tasks, loading, getTasks }) => {
  const [openModal, setOpenModal] = useState(false);
  const [onEditing, setOnEditing] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editTask, setEditTask] = useState({ title: "", content: "" });

  const handleChange = (e) =>
    setEditTask({ ...editTask, [e.target.name]: e.target.value });

  const toggleModal = () => {
    setOpenModal(!openModal);
    if (onEditing) {
      setOnEditing(false);
    }
  };

  const toggleModalDelete = (task) => {
    toggleModal();
    setSelectedTask(task);
  };

  const toggleModalEdit = (task) => {
    setOnEditing(true);
    setOpenModal(!openModal);
    setSelectedTask(task);
  };

  const handleDelete = async () => {
    try {
      const tLoading = toast.loading("Deleting task...");

      await API.del("test", `/deleteTask?id=${selectedTask.id}`);
      toast.success("Task deleted", { id: tLoading });
      toggleModal();
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const tLoading = toast.loading("Editing task...");

      await API.put("test", `/updateTask?id=${selectedTask.id}`, {
        body: { editTask },
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Task edited!", { id: tLoading });
      toggleModal();
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setEditTask(selectedTask);
  }, [selectedTask]);

  if (!tasks.length > 0)
    return (
      <Container sx={{ marginTop: "50px" }}>
        <Card>
          <CardContent>
            <h3>You don't have any tasks yet, click new task to create one</h3>
          </CardContent>
        </Card>
      </Container>
    );

  return (
    <>
      <Modal
        open={openModal}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {onEditing ? (
            <form
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
              onSubmit={handleEdit}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit task
              </Typography>
              <Input
                placeholder="Task title"
                name="title"
                onChange={handleChange}
                value={editTask?.title}
              />
              <Input
                placeholder="Task content"
                name="content"
                onChange={handleChange}
                value={editTask?.content}
              />

              <Button
                type="submit"
                variant="outlined"
                sx={{ fontWeight: "bold" }}
              >
                Save
              </Button>
              <Button
                onClick={toggleModal}
                type="button"
                variant="outlined"
                sx={{ fontWeight: "bold" }}
              >
                Cancel
              </Button>
            </form>
          ) : (
            <>
              <h1
                style={{
                  textAlign: "center",
                  marginBottom: "30px",
                  fontWeight: "normal",
                }}
              >
                Delete task: {selectedTask?.title}?
              </h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                <Button
                  onClick={handleDelete}
                  variant="contained"
                  color={"error"}
                >
                  Yes, delete
                </Button>
                <Button onClick={toggleModal} variant="contained">
                  Cancel
                </Button>
              </div>
            </>
          )}
        </Box>
      </Modal>
      <Container sx={{ marginTop: "50px" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          tasks.map((task, i) => (
            <Card key={i} sx={{ marginBottom: "20px", boxShadow: 5 }}>
              <CardContent>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>{task.title}</h3>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                      onClick={() => toggleModalEdit(task)}
                      variant="contained"
                      size="small"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => toggleModalDelete(task)}
                      variant="contained"
                      size="small"
                      color="error"
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                <p>{task.content}</p>
              </CardContent>
            </Card>
          ))
        )}
      </Container>
    </>
  );
};
