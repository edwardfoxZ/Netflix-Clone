import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineRemoveCircle } from "react-icons/md";

export default function BasicPay () {
    return(
        <div className="Basic-payment d-flex flex-column p-3">
        <div className="header-card p-3">
            <h1 className="text-white">Basic</h1>
        </div>
        <div className="w-100 d-flex flex-row mt-4 p-2">
            <div className="d-flex flex-grow-1 gap-3">
                <div>
                    <FaCheckCircle fontSize="25" color="#11a4d3"/>
                </div>
                <div style={{lineHeight:'25px'}} className="d-flex flex-column align-items-start">
                    <p className="fs-5">Monthly price</p>
                    <p className="fs-5 fw-bold">$5.00</p>
                </div>
            </div>
        </div>
        <hr />
        <div className="w-100 d-flex flex-row mt-4 p-2">
            <div className="d-flex flex-grow-1 gap-3">
                <div>
                    <FaCheckCircle fontSize="25" color="#11a4d3"/>
                </div>
                <div style={{lineHeight:'25px'}} className="d-flex flex-column align-items-start">
                    <p className="fs-5">Downloads</p>
                    <p className="fs-5 fw-bold">Included</p>
                </div>
            </div>
        </div>
        <hr />
        <div className="w-100 d-flex flex-row mt-4 p-2">
            <div className="d-flex flex-grow-1 gap-3">
                <div>
                    <MdOutlineRemoveCircle fontSize="25" color="grey"/>
                </div>
                <div style={{lineHeight:'25px'}} className="d-flex flex-column align-items-start">
                    <p className="fs-5">South Park</p>
                    <p className="fs-5 fw-bold">Included</p>
                </div>
            </div>
        </div>
    </div>
    )
}