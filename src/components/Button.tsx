import styles from './Button.module.scss';
import { Link } from 'react-router';

type ButtonVariantType = 'danger' | 'success' | 'default';
type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonI {
  text: string,
  type?: ButtonType,
  variant?: ButtonVariantType
  onButtonClick?: () => void,
  navigateTo: string,
}

export default function Button({
    text, 
    type, 
    variant, 
    onButtonClick, 
    navigateTo
  }:ButtonI) {
  return navigateTo ? (
    <Link 
      to={navigateTo}
      className={styles['button']}
    >
      {text}
    </Link>
  ):(
    <button 
      type={type} 
      data-variant={variant} 
      className={styles['button']}
      onClick={onButtonClick} 
    >
      {text}
    </button>
  )
}