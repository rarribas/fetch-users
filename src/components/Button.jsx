import styles from './Button.module.scss';

// eslint-disable-next-line react/prop-types
export default function Button({text, type, variant, onButtonClick}) {
  return (
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