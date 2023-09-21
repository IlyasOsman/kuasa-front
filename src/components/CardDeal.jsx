import {useNavigate} from "react-router-dom";
import {geosync} from "../assets";
import styles, {layout} from "../style";
import Button from "./Button";

const CardDeal = () => {
  const navigate = useNavigate();
  return (
    <section className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Discover exceptional opportunities <br className="sm:block hidden" /> within KUASA
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Explore the numerous opportunities available at KUASA, and start on a profound aerospace
          adventure with simplicity and sophistication.
        </p>

        <Button styles={`mt-10`} text="Explore" onClick={() => navigate("/blog")} />
      </div>

      <div className={layout.sectionImg}>
        <img src={geosync} alt="geosync" className="w-[100%] h-[100%]" />
      </div>
    </section>
  );
};

export default CardDeal;
