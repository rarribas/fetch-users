import { useState, forwardRef } from "react";
import Button from "./Button";
import styles from "./Form.module.scss";

// eslint-disable-next-line react/prop-types
const Form = forwardRef(({ onFormSubmit, children, buttonText = "Submit" }, ref) => {
  const [isSaving, setIsSaving] = useState(false);

  const afterSubmit = (ev) => {
    ev.preventDefault();
    onFormSubmit(ev); 
    setIsSaving(false);
  };

  return (
    <form ref={ref} className={styles.form} onSubmit={afterSubmit}>
      <div>{children}</div>
      <div>
        <Button
          text={buttonText}
          type="submit"
          disabled={isSaving}
          onClick={() => setIsSaving(true)}
        />
      </div>
    </form>
  );
});

Form.displayName = 'Form';

export default Form;
