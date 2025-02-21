import { useState, forwardRef } from "react";
import Button from "./Button";
import styles from "./Form.module.scss";

// eslint-disable-next-line react/prop-types
const Form = forwardRef(({ onFormSubmit, children }, ref) => {
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
          text="Submit"
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
