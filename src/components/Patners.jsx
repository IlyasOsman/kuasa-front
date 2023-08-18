import { patners } from "../constants";
import styles from "../style";

const Patners = () => (
  <section id="patners" className={`${styles.flexCenter} my-2`}>
    <div className={`flex ${styles.flexCenter} flex-wrap w-full md:flex-col lg:flex-row`}>
      {patners.map((patner) => (
        <div key={patner.id} className={`flex-1 ${styles.flexCenter} min-w-[120px] m-2`}>
          <img src={patner.logo} alt="patner_logo" className="sm:w-[64px] w-[64px] h-[64px] object-contain" />
        </div>
      ))}
    </div>
  </section>
);

export default Patners;
