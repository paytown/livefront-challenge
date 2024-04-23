import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      Home
      <Link to="todo/link-test">Link Test</Link>
    </div>
  );
}
