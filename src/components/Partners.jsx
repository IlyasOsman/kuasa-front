import {partners} from "../constants";
import styles from "../style";

const Partners = () => (
  <section id="partners" className={`${styles.flexCenter} my-2`}>
    <div className={`flex ${styles.flexCenter} flex-wrap w-full md:flex-col lg:flex-row`}>
      {partners.map((partner) => (
        <div key={partner.id} className={`flex-1 ${styles.flexCenter} min-w-[120px] m-2`}>
          <img
            src={partner.logo}
            alt="partner_logo"
            className="sm:w-[64px] w-[64px] h-[64px] object-contain"
          />
        </div>
      ))}
    </div>
  </section>
);

export default Partners;
