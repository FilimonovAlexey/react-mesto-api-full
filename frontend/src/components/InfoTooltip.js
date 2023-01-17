import popupIcon from "../images/Close_Icon.svg";
import popupSucsess from "../images/sucsess.svg";
import popupError from "../images/error.svg";
import { useEffect } from "react";

function InfoTooltip(props) {
  useEffect(() => {
    if (!props.isOpen) {
      return;
    }

    function hundleEsc(evt) {
      if (evt.key === "Escape") {
        props.onClose();
      }
    }

    function hundleClick(evt) {
      if (evt.target.classList.contains("popup_opened")) {
        props.onClose();
      }
    }

    document.addEventListener("keydown", hundleEsc);
    document.addEventListener("click", hundleClick);

    return () => {
      document.removeEventListener("keydown", hundleEsc);
      document.removeEventListener("click", hundleClick);
    };
  }, [props.isOpen]);

  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_size330 ">
        <img
          className="popup__status-image"
          src={props.resStatus == "success" ? popupSucsess : popupError}
          alt="Статус сабмита"
        ></img>
        <h2
          style={{ width: "358px", textAlign: "center", margin: "0" }}
          className="popup__title"
        >
          {props.resStatus == "success"
            ? props.infoText.success
            : props.infoText.error}
        </h2>
        <button className="popup__button-close" type="button">
          <img
            className="popup__icon"
            src={popupIcon}
            alt="кнопка закрыть"
            onClick={props.onClose}
          />
        </button>
      </div>
    </div>
  );
}

export default InfoTooltip;
