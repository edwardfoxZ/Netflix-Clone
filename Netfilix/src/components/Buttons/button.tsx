import { Link } from "react-router-dom";

interface Button {
  size: string;
  name: string;
}
export default function Button({ size, name }: Button) {
  return (
    <>
      <Link className={`btn btn-danger ${size}`} to="/log-in">
        {name}
      </Link>
    </>
  );
}
