import styled from "styled-components";

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ theme, $variant }) =>
    $variant === "primary"
      ? theme.primaryButtonBg
      : $variant === "secondary"
      ? theme.secondaryButtonBg
      : theme.defaultButtonBg};
  color: ${({ theme, $variant }) =>
    $variant === "primary"
      ? theme.primaryButtonText
      : $variant === "secondary"
      ? theme.secondaryButtonText
      : theme.defaultButtonText};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default Button;
