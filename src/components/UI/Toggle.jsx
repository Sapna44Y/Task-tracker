import styled from "styled-components";

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ToggleLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background: #4f46e5;
  }

  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #6b7280;
  transition: 0.4s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const ToggleText = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
`;

const Toggle = ({ checked, onChange, label }) => {
  return (
    <ToggleContainer>
      <ToggleLabel>
        <ToggleInput type="checkbox" checked={checked} onChange={onChange} />
        <ToggleSlider />
      </ToggleLabel>
      {label && <ToggleText>{label}</ToggleText>}
    </ToggleContainer>
  );
};

export default Toggle;
