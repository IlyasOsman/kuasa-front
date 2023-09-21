import {randomimage1} from "../assets";
import styles, {layout} from "../style";
import Button from "./Button";
import {useAuth} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

const HomePageSectionTwo = () => {
  const {user} = useAuth();
  const navigate = useNavigate();

  return (
    <section id="product" className={layout.sectionReverse}>
      <div className={layout.sectionImgReverse}>
        <img src={randomimage1} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />

        {/* gradient start */}
        <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
        <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
        {/* gradient end */}
      </div>

      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Lead your aerospace dreams with <br className="sm:block hidden" /> ease & confidence.
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Explore the boundless boundaries of personal development and grow your leadership skills.
          Engage in projects that sharpen your technical talents while simultaneously developing
          your social skills.
        </p>

        <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
          {user ? null : <Button text="Join Us" onClick={() => navigate("/signup")} />}
        </div>
      </div>
    </section>
  );
};

export default HomePageSectionTwo;
