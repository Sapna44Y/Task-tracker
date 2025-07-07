import { useTasks } from "../context/TaskContext";
import TaskForm from "./Tasks/TaskForm";
import TaskList from "./Tasks/TaskList";
import TaskFilter from "./Tasks/TaskFilter";
import styled from "styled-components";
import { FaSignOutAlt, FaPlus } from "react-icons/fa";
import { useState } from "react";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import { useNavigate } from "react-router-dom";

const DashboardContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 8px;
`;

const UserText = styled.div`
  font-size: 0.875rem;
`;

const Username = styled.span`
  font-weight: 600;
`;

const Email = styled.span`
  color: ${({ theme }) => theme.textSecondary};
`;

const AddTaskButton = styled(Button)`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Dashboard = () => {
  const { user, logout, isInitialized } = useTasks();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isInitialized) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <DashboardContainer>
      <UserInfo>
        <UserText>
          Logged in as <Username>{user.username}</Username>{" "}
          <Email>({user.email})</Email>
        </UserText>
        <Button $variant="secondary" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </Button>
      </UserInfo>

      <AddTaskButton onClick={() => setShowTaskForm(true)}>
        <FaPlus /> Add New Task
      </AddTaskButton>

      {showTaskForm && (
        <Modal onClose={() => setShowTaskForm(false)}>
          <TaskForm onCancelEdit={() => setShowTaskForm(false)} />
        </Modal>
      )}

      <TaskFilter />
      <TaskList />
    </DashboardContainer>
  );
};

export default Dashboard;
