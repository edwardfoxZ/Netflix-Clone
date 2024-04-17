import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

interface BackBu {
  to: string;
  className: string;
}
export default function BackBu({ to, className }: BackBu) {
  return (
    <>
      <Link to={to} className={className}>
        <button className="mt-3">
          <IoMdArrowRoundBack color="red" />
        </button>
      </Link>
    </>
  );
}
