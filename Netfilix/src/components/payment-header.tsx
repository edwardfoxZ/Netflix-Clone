import BasicPay from "./Payments-type/basic-payment";
import PremiumPay from "./Payments-type/premium-payment";

export default function PaymentHeader () {
    return(
        <>
            <div className="Payment-header">
                <BasicPay/>
                <PremiumPay/>
            </div>
        </>
    )
}