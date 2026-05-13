import CommonButton from "../components/CommonButton";
import WindowHeader from "../components/WindowHeader";
import resumeMainContent from "../assets/resume_main_content_no_bg.png";
import heartIcon from "../assets/heart.png";
import "./ResumePage.scss";

const ResumePage = () => {
  return (
    <main className="resume-page">
      <div className="resume-page__background-layer" />

      <div className="resume-page__sticky-header">
        <WindowHeader title="Resume.jpg" />
      </div>

      <div className="resume-page__content-container">
        <div className="resume-page__hearts-layer">
          <img
            src={heartIcon}
            className="resume-page__heart resume-page__heart--top-left"
            alt=""
          />
          <img
            src={heartIcon}
            className="resume-page__heart resume-page__heart--mid-right"
            alt=""
          />
        </div>
        <div className="resume-page__window">
          <div className="resume-page__window-body">
            <img
              src={resumeMainContent}
              alt="My Resume Content"
              className="resume-page__image"
            />
          </div>
        </div>

        <div
          className="resume-page__actions"
          style={{
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <CommonButton text="Explore my works" to="/works" />
        </div>
      </div>
    </main>
  );
};

export default ResumePage;
