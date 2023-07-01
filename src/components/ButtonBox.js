import "./ButtonBox.css";
import { useNavigate } from 'react-router-dom';

function ButtonBox(props) {
  const { description, title, link, beta, sameSite } = props;
  const navigate = useNavigate();

  const openApp = () => {
    if (sameSite){
      navigate(link)
    } else{
    console.log("Visiting Link");
    window.open(link, "_blank");
    }
  };


  return (
    <div className="ButtonBox" onClick={openApp}>
      <h3>{title}</h3>
      <p>{description}</p>
      {beta === true ? <p>This is in beta.</p> : null}
    </div>
  );
}

export default ButtonBox;
