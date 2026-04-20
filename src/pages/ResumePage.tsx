import CommonButton from "../components/CommonButton";
import resumeImage from "../assets/resume_content.png";
import bgBottomResumeImage from "../assets/Rectangle_bottom_resume.png";
import "./ResumePage.scss";

const ResumePage = () => {
  return (
    <main className="resume-page">
      <div className="resume-page__window">
        <div className="resume-page__window-body">
          <img
            src={resumeImage}
            alt="My Resume"
            className="resume-page__image"
          />
        </div>
      </div>
      <div
        className="resume-page__actions"
        style={{
          backgroundImage: `url(${bgBottomResumeImage})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <CommonButton text="Explore my works" to="/works" />
      </div>
    </main>
  );
};

export default ResumePage;
