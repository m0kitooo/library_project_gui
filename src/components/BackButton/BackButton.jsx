import { useNavigate, useLocation } from "react-router-dom";
import arrowIcon from '../../assets/arrow-icon.svg';

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
    <img
      src={arrowIcon}
      alt="Back"
      onClick={handleBack}
      style={{ cursor: "pointer" }}
    />
  );
}