import { useTasks } from "../../context/TaskContext";
import TaskItem from "./TaskItem";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const TasksContainer = styled.div`
  margin-top: 2rem;
`;

const SearchContainer = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.inputBg};
  color: ${({ theme }) => theme.text};
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.textSecondary};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const TaskCount = styled.div`
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const TaskList = () => {
  const {
    tasks: filteredTasks,
    allTasks,
    searchTerm,
    setSearchTerm,
  } = useTasks();

  const completedCount = allTasks.filter((task) => task.completed).length;
  const pendingCount = allTasks.filter((task) => !task.completed).length;

  const searchTasks = (tasks, term) => {
    if (!term) return tasks;

    const lowerTerm = term.toLowerCase();
    return tasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(lowerTerm) ||
        (task.description &&
          task.description.toLowerCase().includes(lowerTerm)) ||
        (task.category && task.category.toLowerCase().includes(lowerTerm))
      );
    });
  };

  const tasks = searchTasks(filteredTasks, searchTerm);

  return (
    <TasksContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search by title, description, or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon />
      </SearchContainer>

      <TaskCount>
        Showing {tasks.length} task{tasks.length !== 1 ? "s" : ""} (
        {pendingCount} pending, {completedCount} completed)
      </TaskCount>

      {tasks.length === 0 ? (
        <EmptyState>
          {searchTerm
            ? "No tasks match your search."
            : "No tasks found. Add a new task to get started!"}
        </EmptyState>
      ) : (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </TasksContainer>
  );
};

export default TaskList;
