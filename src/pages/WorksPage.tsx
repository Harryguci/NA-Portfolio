import { Link } from "react-router-dom";
import WindowHeader from "../components/WindowHeader";
import "./WorksPage.scss";

// Import actual folder shape images
import workEcommerceImg from "../assets/work_ecommerce.png";
import workLandingImg from "../assets/work_landingpage.png";
import workPosmImg from "../assets/work_posm.png";
import workSocialAdsImg from "../assets/work_socialads.png";
import workEcommerceLgImg from "../assets/work_ecommerce_lg.png";
import workLandingLgImg from "../assets/work_landingpage_lg.png";
import workPosmLgImg from "../assets/work_posm_lg.png";
import workSocialAdsLgImg from "../assets/work_socialads_lg.png";
import tableOfContentTitle from "../assets/work_typo.png";
const workCategories = [
  {
    id: "ecommerce",
    image: workEcommerceImg,
    imageLg: workEcommerceLgImg,
    tabClass: "tab-right",
  },
  {
    id: "socialads",
    image: workSocialAdsImg,
    imageLg: workSocialAdsLgImg,
    tabClass: "tab-left",
  },
  {
    id: "posm",
    image: workPosmImg,
    imageLg: workPosmLgImg,
    tabClass: "tab-right",
  },
  {
    id: "landing",
    image: workLandingImg,
    imageLg: workLandingLgImg,
    tabClass: "tab-left",
  },
];

const WorksPage = () => {
  return (
    <main className="works-page">
      <div className="works-page__background-layer" />

      <div className="works-page__sticky-header">
        <WindowHeader title="Table_of_content.folder" />
      </div>

      <section className="works-page__content">
        <div className="works-hero">
          <div className="works-hero__title-container">
            <img src={tableOfContentTitle} alt="" />
          </div>
        </div>

        <div className="folder-stack">
          {workCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/works/${cat.id}`}
              className={`folder-bar-container ${cat.tabClass}`}
            >
              <div className="folder-shape">
                <picture>
                  <source media="(min-width: 1000px)" srcSet={cat.imageLg} />
                  <img src={cat.image} alt="" className="folder-shape__img" />
                </picture>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default WorksPage;
