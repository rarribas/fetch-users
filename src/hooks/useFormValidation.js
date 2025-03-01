import { useState } from "react";
export function useFormValidation() {

  const [formErrors, setFormErrors] = useState([]);

  const getEmptyValues = (formElements) => {
    return Object.entries(formElements)
      // eslint-disable-next-line no-unused-vars
      .filter(([_, value]) => value === '') 
      .map(([key]) => key);
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