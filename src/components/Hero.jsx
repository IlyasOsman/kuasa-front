import styles from "../style";
import {discount, randomimage2} from "../assets";
import GetStarted from "./GetStarted";

const Hero = () => (
  <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
    <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 z-[5]`}>
      <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
        <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
        <p className={`${styles.paragraph} ml-2`}>
          <span className="text-white">20%</span> Waived For{" "}
          <span className="text-white"> New</span> Registration
        </p>
      </div>

      <div className="flex flex-row justify-between items-center w-full z-[5]">
        <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
          The <br className="sm:block hidden" /> <span className="text-gradient">KUASA</span>{" "}
        </h1>
        <div className="ss:flex hidden md:mr-4 mr-0">
          <GetStarted />
        </div>
      </div>

      <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
        Engineering club.
      </h1>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Our foundation is built on unwavering passion. We believe that when passion meets
        innovation, extraordinary feats are achieved. KUASA empowers students to transform their
        dreams into tangible projects that push the boundaries of aerospace engineering.
      </p>
    </div>

    <div className={`flex-1 flex ${styles.flexCenter} md:my-0 relative`}>
      <img src={randomimage2} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />

      {/* gradient start */}
      <div className="absolute z-[10] w-[40%] h-[35%] top-0 pink__gradient" />
      <div className="absolute z-[10] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
      <div className="absolute z-[5] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
      {/* gradient end */}
    </div>

    <div className={`ss:hidden ${styles.flexCenter}`}>
      <GetStarted />
    </div>
  </section>
);

export default Hero;
