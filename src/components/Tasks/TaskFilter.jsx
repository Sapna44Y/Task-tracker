import { useTasks } from "../../context/TaskContext";
import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: ${({ theme, $active }) =>
    $active ? theme.filterActiveBg : theme.filterBg};
  color: ${({ theme, $active }) =>
    $active ? theme.filterActiveText : theme.filterText};
  transition: all 0.2s;

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.filterActiveBg : theme.filterHoverBg};
  }
`;

const TaskFilter = () => {
  const { filter, setFilter } = useTasks();

  return (
    <FilterContainer>
      <FilterButton $active={filter === "all"} onClick={() => setFilter("all")}>
        All
      </FilterButton>
      <FilterButton
        $active={filter === "pending"}
        onClick={() => setFilter("pending")}
      >
        Pending
      </FilterButton>
      <FilterButton
        $active={filter === "completed"}
        onClick={() => setFilter("completed")}
      >
        Completed
      </FilterButton>
    </FilterContainer>
  );
};

export default TaskFilter;
