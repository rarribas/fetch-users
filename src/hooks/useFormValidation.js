import { useState } from "react";
export function useFormValidation() {

  const [formErrors, setFormErrors] = useState([]);

  const getEmptyValues = (formElements) => {
    
    const formElementsArray = Array.from(formElements); // Convert HTMLFormControlsCollection to an array

    return formElementsArray.filter((element) => element.name && element.value.trim() === '')
      .map((element) => element.name);
  }

  const isValidField = (inputName) => {
    if(formErrors.length === 0) return true;
    return !formErrors.includes(inputName);
  };

  const isValidData = (formElements) => {
    const emptyElements = getEmptyValues(formElements); 

    if(emptyElements.length > 0){
      setFormErrors(emptyElements);
      return false;
    }else {
      setFormErrors([]);
      return true;
    }
  };

  return {
    isValidData,
    isValidField
  }
}