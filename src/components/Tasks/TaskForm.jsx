import { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import styled from "styled-components";
import { FaPlus, FaTimes } from "react-icons/fa";

const Form = styled.form`
  background: ${({ theme }) => theme.cardBg};
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative; /* Added for positioning the close button */
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const FormTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.25rem;
  padding: 0.5rem;
  margin-left: 1rem;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  min-height: 100px;
  resize: vertical;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.2s;

  &:hover {
    background: #4338ca;
  }
`;

const FlexRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const TaskForm = ({ taskToEdit, onCancelEdit }) => {
  const { addTask, updateTask } = useTasks();
  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [description, setDescription] = useState(taskToEdit?.description || "");
  const [priority, setPriority] = useState(taskToEdit?.priority || "medium");
  const [dueDate, setDueDate] = useState(taskToEdit?.dueDate || "");
  const [category, setCategory] = useState(taskToEdit?.category || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: dueDate || null,
      category: category.trim(),
    };

    if (taskToEdit) {
      updateTask(taskToEdit.id, taskData);
      onCancelEdit();
    } else {
      addTask(...Object.values(taskData));
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
      setCategory("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormHeader>
        <FormTitle>{taskToEdit ? "Edit Task" : "Add New Task"}</FormTitle>
        <CloseButton type="button" onClick={onCancelEdit} aria-label="Close">
          <FaTimes />
        </CloseButton>
      </FormHeader>

      <FormGroup>
        <Label htmlFor="title">Title *</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Task title"
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="description">Description</Label>
        <TextArea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
        />
      </FormGroup>
      <FlexRow>
        <FormGroup style={{ flex: 1 }}>
          <Label htmlFor="priority">Priority</Label>
          <Select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </FormGroup>
        <FormGroup style={{ flex: 1 }}>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </FormGroup>
      </FlexRow>
      <FormGroup>
        <Label htmlFor="category">Category/Tags</Label>
        <Input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Work, Personal"
        />
      </FormGroup>
      <FlexRow style={{ justifyContent: "flex-end", gap: "1rem" }}>
        {taskToEdit && (
          <Button
            type="button"
            onClick={onCancelEdit}
            style={{ background: "#6b7280" }}
          >
            Cancel
          </Button>
        )}
        <Button type="submit">
          <FaPlus /> {taskToEdit ? "Update Task" : "Add Task"}
        </Button>
      </FlexRow>
    </Form>
  );
};

export default TaskForm;
