import styles from "./style";
import {
  HomePageSectionOne,
  HomePageSectionTwo,
  CardDeal,
  Patners,
  CTA,
  Footer,
  Navbar,
  Stats,
  Leadership,
  Hero,
  Faqs,
} from "./components";
import { hero } from "./assets";

function App() {
  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

      <div className={`bg-primary relative ${styles.flexStart}`}>
        <div className="absolute inset-0 z-[0]">
          <video
            className="w-full h-full object-cover object-center"
            autoPlay
            loop
            muted
            controls={false}
            onContextMenu={(e) => e.preventDefault()}
            style={{ cursor: "none", opacity: 0.9, filter: "blur(2px)" }}>
            <source src={hero} type="video/mp4" />
          </video>
        </div>
        <div className={`bg-primary ${styles.boxWidth}`}>
          <Hero />
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Stats />
          <HomePageSectionOne />
          <HomePageSectionTwo />
          <CardDeal />
          <Leadership />
          <Patners />
          <CTA />
          <Faqs />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
