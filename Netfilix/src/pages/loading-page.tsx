import { Spinner } from "react-bootstrap";

const LoadingPage = () => {
  return (
    <div className="w-100 h-100 d-flex align-items-center">
      <div className="d-flex mx-auto gap-3 align-items-center">
        <Spinner animation="border" variant="danger" />
        <p className="fs-3 fw-bold">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
