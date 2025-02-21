// eslint-disable-next-line react/prop-types
import styles from "./FormMessage.module.scss";
export default function FormMessage({message, variant}) {
  return <p className={styles['form-message']} data-variant={variant}>{message}</p>
}