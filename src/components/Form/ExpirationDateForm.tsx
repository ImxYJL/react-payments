import { useState, useEffect, useRef } from "react";

import Input from "./Input";
import FormField from "../common/FormField";

import { EXPIRATION_DATE_FORM, FORM_REGEXP } from "../../constants/form";

import { ICardFormProps } from "./Form";

const ExpirationDateForm = ({
  labelContent,
  inputCount,
  type,
  placeholders,
  setExpirationDate,
  setAllFormsValid,
  setIsFormFilledOnce,
}: ICardFormProps) => {
  const [isGotInputOnce, setIsGotInputOnce] = useState(false);
  const [focusedInputIndex, setFocusedInputIndex] = useState("0");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValidities, setInputValidities] = useState({});

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const validateMonth = (value: string) => {
    return value !== "" && FORM_REGEXP.validMonth.test(value);
  };

  const validateYear = (value: string) => {
    const intValue = Number(value);
    return (
      !isNaN(intValue) &&
      intValue >= EXPIRATION_DATE_FORM.startYear &&
      intValue <= EXPIRATION_DATE_FORM.endYear
    );
  };

  const updateInputValidity = (index: string, isValid: boolean) => {
    setInputValidities((prevValidities) => ({
      ...prevValidities,
      [index]: isValid,
    }));
  };

  const focusToNextInput = () => {
    const curIdx = focusedInputIndex;
    const curInputRef = inputRefs.current[Number(curIdx)] as HTMLInputElement;
    const nextInputRef = inputRefs.current[Number(curIdx) + 1];

    if (
      curInputRef.value.length === EXPIRATION_DATE_FORM.maxInputLength &&
      nextInputRef
    ) {
      nextInputRef.focus();
    }
  };

  const setInputRef = (element: HTMLInputElement, index: number) => {
    inputRefs.current[index] = element;
  };

  useEffect(() => {
    const allValid = Object.values(inputValidities).every((isValid) => isValid);
    const allFilled = Object.keys(inputValidities).length === inputCount;

    setAllFormsValid(allValid && allFilled);

    focusToNextInput();

    setErrorMessage(
      (allValid && allFilled) || !isGotInputOnce
        ? ""
        : EXPIRATION_DATE_FORM.errorMessage.notAllValid
    );

    if (allValid && allFilled) {
      setIsFormFilledOnce(true);
    }
  }, [inputValidities]);

  const inputs = Array.from({ length: inputCount }, (_, index) => (
    <Input
      key={index}
      index={index.toString()}
      ref={(element) => setInputRef(element as HTMLInputElement, index)}
      type={type}
      placeholder={placeholders ? placeholders[index] : ""}
      maxLength={EXPIRATION_DATE_FORM.maxInputLength}
      setErrorMessage={setErrorMessage}
      setData={setExpirationDate ? setExpirationDate : () => {}}
      setAllInputValid={(isValid: boolean) =>
        updateInputValidity(index.toString(), isValid)
      }
      validationRule={(value) =>
        index === 0 ? validateMonth(value) : validateYear(value)
      }
      errorMessageText={
        index === 0
          ? EXPIRATION_DATE_FORM.errorMessage.invalidMonth
          : EXPIRATION_DATE_FORM.errorMessage.invalidYear
      }
      setFocusedInputIndex={setFocusedInputIndex}
      onFocus={() => (setIsGotInputOnce ? setIsGotInputOnce(true) : () => {})}
    />
  ));

  return (
    <FormField
      labelContent={labelContent}
      inputs={inputs}
      errorMessage={errorMessage}
    />
  );
};

export default ExpirationDateForm;
