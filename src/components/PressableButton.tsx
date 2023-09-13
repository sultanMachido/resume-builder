import styled from "styled-components";

interface PressableButtonProps {
  radius?: string;
}

const PressableButton = styled.div<PressableButtonProps>`
  :active {
    border-radius: ${(props) => (props.radius ? props.radius : null)};
    transform: scale(0.98);
  }
`;

export default PressableButton;
