import "./ButtonBox.css";
import { useNavigate } from 'react-router-dom';
import BetaTag from './BetaTag'
import RecentTag from './RecentTag'

function ButtonBox(props) {
  const { description, title, link, beta, sameSite, active, recent } = props;
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
    <div className="ButtonBoxWrapper">
    <div className={active === false ? "ButtonBoxDeactivated" : "ButtonBox"} onClick={openApp}>
      <h3>{title + (active===false ? " ⋅ Not available on mobile" : "")}</h3>
      <p>{description}</p>
      {beta === true && active !== false ? <BetaTag/> : null}
      {recent === true && active !== false ? <RecentTag/> : null}
    </div>
    </div>
  );
}

export default ButtonBox;
