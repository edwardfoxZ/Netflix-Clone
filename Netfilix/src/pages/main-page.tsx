import Button from "../components/Buttons/button";
import Navbar from "../components/navbar";

export default function MainPage() {
  return (
    <div className="Main">
      <Navbar />
      <div
        className="title-main text-white d-flex flex-column"
        draggable={false}
      >
        <p className="mb-0" style={{ fontSize: "70px", lineHeight: "80px" }}>
          Unlimited movies, TV shows, and more
        </p>
        <p
          className="d-flex mx-auto mt-0"
          style={{ fontSize: "30px", lineHeight: "80px" }}
        >
          Watch anywhere.Cancel anytime.
        </p>
        <div className="signUp-button d-flex">
          <Button name="Sign In" size="w-40 p-3 fs-3 mx-auto" />
        </div>
      </div>
    </div>
  );
}
