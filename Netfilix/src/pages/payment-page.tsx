import BackBu from "../components/Buttons/back-button";
import Button from "../components/Buttons/button";
import PaymentHeader from "../components/payment-header";

export default function PaymentPage() {
  return (
    <div className="Payment-page">
      <BackBu to="/log-in" className="fs-1 pb-2" />
      <p
        className="fs-1 fw-bold"
        style={{ position: "absolute", top: "15%", left: "25%" }}
      >
        Choose a plan that works for you
      </p>
      <PaymentHeader />
      <Button name="Purchase" size="" />
    </div>
  );
}
