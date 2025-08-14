import { useNavigate, useLocation } from "react-router-dom";
import arrowIcon from '../../assets/arrow-icon.svg';
import styles from './BackButton.module.css';

export default function BackButton( {fallbackRoute} ) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate(fallbackRoute);
    }
  };

  return (
    <button className={styles.backButton} onClick={handleBack}>
      <img className={styles.arrowImage} src={arrowIcon} alt="Back"/>
    </button>
  );
}