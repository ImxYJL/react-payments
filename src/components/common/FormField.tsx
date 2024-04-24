import styled from "styled-components";
import ErrorMessage from "../Form/ErrorMessage";

const FormField = ({
  labelContent,
  inputs,
  dropdowns,
  errorMessage,
}: {
  labelContent: string;
  inputs?: JSX.Element[];
  dropdowns?: JSX.Element;
  errorMessage: string;
}) => {
  return (
    <>
      <InputLabel htmlFor={labelContent}>{labelContent}</InputLabel>
      <InputsContainer id={labelContent}>{inputs}</InputsContainer>
      <InputsContainer>{dropdowns}</InputsContainer>
      <ErrorMessage errorMessage={errorMessage} />
    </>
  );
};

const InputLabel = styled.label`
  font-size: 12px;
  font-weight: 500;
`;

const InputsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 5px;
`;

export default FormField;
