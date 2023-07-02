import "./ButtonBox.css";
import { useNavigate } from 'react-router-dom';
import BetaTag from './BetaTag'

function ButtonBox(props) {
  const { description, title, link, beta, sameSite, active } = props;
  const navigate = useNavigate();

  const openApp = () => {
    if (active !== false){
    if (sameSite){
      navigate(link)
    } else{
    console.log("Visiting Link");
    window.open(link, "_blank");
    }
  }
  };


  return (
    <div className={active === false ? "ButtonBoxDeactivated" : "ButtonBox"} onClick={openApp}>
      <h3>{title + (active===false ? " ⋅ Not available on mobile" : "")}</h3>
      <p>{description}</p>
      {beta === true && active !== false ? <BetaTag/> : null}
    </div>
  );
}

export default ButtonBox;
