import { useParams, Link } from "react-router-dom";
import WindowHeader from "../components/WindowHeader";
import "./WorksPage.scss"; // Reusing some styles, maybe add specific detail styles later

const WorksDetailPage = () => {
  const { id } = useParams();

  return (
    <main className="works-page">
      <div className="works-page__background-layer" />
      <div className="works-page__sticky-header">
        <WindowHeader title={`Work Detail - ${id}`} />
      </div>

      <section className="works-page__content">
        <div className="works-page__title-area">
          <Link
            to="/works"
            style={{
              color: "#f06292",
              fontWeight: "bold",
              marginBottom: "1rem",
              display: "inline-block",
            }}
          >
            ← Back to Works
          </Link>
          <h1>Project: {id?.toUpperCase()}</h1>
          <p>
            Detailed breakdown and process for the {id} project will be
            showcased here.
          </p>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.8)",
            padding: "4rem",
            borderRadius: "24px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontFamily: "SVN Retron 2000" }}>
            Case Study Coming Soon
          </h2>
          <p>
            We are currently gathering the assets for this project. Stay tuned!
          </p>
        </div>
      </section>
    </main>
  );
};

export default WorksDetailPage;
