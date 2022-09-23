import React from "react";
import "../styles/footer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
const Footer = () => {
  return (
    <div className="background">
      <button
        type="button"
        className="btn btn-secondary up"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Go up"
        onClick={() => {
          window.scrollTo(0,0);
        }}
      >
        <FontAwesomeIcon icon={solid("up-long")}></FontAwesomeIcon>
      </button>
      <p>
        Team members: <br />
        &emsp;&emsp;
        <a href="/about/lai-gia-bao" className="personal-info">
          Lại Gia Bảo - ITITIU19005
        </a>{" "}
        <br />
        &emsp;&emsp;
        <a href="/about/nguyen-minh-an" className="personal-info">
          Nguyễn Minh An - ITITIU19070
        </a>
        <br />
        &emsp;&emsp;
        <a href="/about/luu-hien-long" className="personal-info">
          Lưu Hiển Long - ITITIU19025
        </a>
      </p>
    </div>
  );
};
export default Footer;
