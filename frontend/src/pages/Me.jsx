import { useParams } from "react-router-dom";
import Header from "../components/Header";

function Me() {
  const { userId } = useParams();
  console.log("user-id", userId);
  return (
    <div>
      <Header />
      <h1>Me page</h1>
    </div>
  );
}

export default Me;
