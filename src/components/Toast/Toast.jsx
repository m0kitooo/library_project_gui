import {useEffect} from "react";
import styles from './Toast.module.css'; 

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
      <div className={styles.toast}>
        {message}
      </div>
  );
}
