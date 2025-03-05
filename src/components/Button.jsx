import styles from './Button.module.scss';
import { Link } from 'react-router';

// eslint-disable-next-line react/prop-types
export default function Button({text, type, variant, onButtonClick, navigateTo}) {
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