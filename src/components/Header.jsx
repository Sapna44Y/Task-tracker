import styled from "styled-components";
import Toggle from "./UI/Toggle";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2rem;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
`;

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <HeaderContainer>
      <Logo>Task Tracker</Logo>
      <Toggle
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
        label={darkMode ? "Dark Mode" : "Light Mode"}
      />
    </HeaderContainer>
  );
};

export default Header;
