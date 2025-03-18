import Header from "../components/Header";
import { useParams } from "react-router-dom";

export default function Treatment() {
  const { treatmentId } = useParams(); // 获取 URL 里的 ObjectId

  console.log("treatment-id", treatmentId);
  return (
    <div>
      <Header />
      <h1>Treatment page</h1>
    </div>
  );
}
