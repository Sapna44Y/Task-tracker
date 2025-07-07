import { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import { format, parseISO } from "date-fns";
import styled from "styled-components";
import {
  FaCheck,
  FaTrash,
  FaEdit,
  FaFlag,
  FaCalendarAlt,
  FaTags,
  FaTimes,
  FaClock,
} from "react-icons/fa";

const TaskCard = styled.div`
  background: ${({ theme, $completed, $priority }) =>
    $completed ? theme.completedTaskBg : theme.taskBg};
  border-left: 4px solid
    ${({ theme, $priority }) =>
      $priority === "high"
        ? theme.priorityHigh
        : $priority === "medium"
        ? theme.priorityMedium
        : theme.priorityLow};
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  opacity: ${({ $completed }) => ($completed ? 0.8 : 1)};

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

const TaskTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.text};
  text-decoration: ${({ $completed }) =>
    $completed ? "line-through" : "none"};
  flex: 1;
`;

const TaskDescription = styled.p`
  margin: 0.5rem 0 1rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const TaskMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const TaskActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  background: ${({ theme, $variant }) =>
    $variant === "complete"
      ? theme.completeButtonBg
      : $variant === "delete"
      ? theme.deleteButtonBg
      : theme.editButtonBg};
  color: ${({ theme, $variant }) =>
    $variant === "complete"
      ? theme.completeButtonText
      : $variant === "delete"
      ? theme.deleteButtonText
      : theme.editButtonText};

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }
`;

const PriorityTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${({ theme, $priority }) =>
    $priority === "high"
      ? theme.priorityHighBg
      : $priority === "medium"
      ? theme.priorityMediumBg
      : theme.priorityLowBg};
  color: ${({ theme, $priority }) =>
    $priority === "high"
      ? theme.priorityHighText
      : $priority === "medium"
      ? theme.priorityMediumText
      : theme.priorityLowText};
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const FormInput = styled.input`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
`;

const FormTextarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
  min-height: 100px;
  resize: vertical;
`;

const FormSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const TaskItem = ({ task }) => {
  const { toggleTaskCompletion, deleteTask, updateTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateTask(task.id, editedTask);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedTask({ ...task });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <TaskCard $priority={task.priority}>
        <EditForm onSubmit={handleEditSubmit}>
          <FormGroup>
            <FormLabel>Title</FormLabel>
            <FormInput
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleEditChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormTextarea
              name="description"
              value={editedTask.description}
              onChange={handleEditChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Priority</FormLabel>
            <FormSelect
              name="priority"
              value={editedTask.priority}
              onChange={handleEditChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <FormLabel>Due Date</FormLabel>
            <FormInput
              type="date"
              name="dueDate"
              value={editedTask.dueDate || ""}
              onChange={handleEditChange}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Category/Tags</FormLabel>
            <FormInput
              type="text"
              name="category"
              value={editedTask.category || ""}
              onChange={handleEditChange}
            />
          </FormGroup>

          <FormActions>
            <Button type="button" onClick={handleCancelEdit} $variant="delete">
              <FaTimes /> Cancel
            </Button>
            <Button type="submit" $variant="complete">
              <FaCheck /> Save Changes
            </Button>
          </FormActions>
        </EditForm>
      </TaskCard>
    );
  }

  return (
    <TaskCard $completed={task.completed} $priority={task.priority}>
      <TaskHeader>
        <TaskTitle $completed={task.completed}>{task.title}</TaskTitle>
        <PriorityTag $priority={task.priority}>
          <FaFlag size={10} /> {task.priority}
        </PriorityTag>
      </TaskHeader>

      {task.description && (
        <TaskDescription>{task.description}</TaskDescription>
      )}

      <TaskMeta>
        <MetaItem>
          <FaCalendarAlt /> Created:{" "}
          {format(parseISO(task.createdAt), "MMM d, yyyy h:mm a")}
        </MetaItem>

        {task.dueDate && (
          <MetaItem>
            <FaCalendarAlt /> Due:{" "}
            {format(parseISO(task.dueDate), "MMM d, yyyy h:mm a")}
          </MetaItem>
        )}

        {task.category && (
          <MetaItem>
            <FaTags /> {task.category}
          </MetaItem>
        )}
      </TaskMeta>

      <TaskActions>
        <Button
          $variant="complete"
          onClick={() => toggleTaskCompletion(task.id)}
          aria-label={task.completed ? "Mark as pending" : "Mark as completed"}
        >
          <FaCheck />
        </Button>

        <Button
          $variant="edit"
          onClick={() => setIsEditing(true)}
          aria-label="Edit task"
        >
          <FaEdit />
        </Button>

        <Button
          $variant="delete"
          onClick={handleDelete}
          aria-label="Delete task"
        >
          <FaTrash />
        </Button>
      </TaskActions>
    </TaskCard>
  );
};

export default TaskItem;
