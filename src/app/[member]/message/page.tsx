import CakeName from "@/components/CakeName";
import { cakePageContainer, pageTop } from "@/styles/pages/main.css";

export default function Page() {
  return (
    <div className={cakePageContainer}>
      <div className={pageTop}>
        <CakeName />
      </div>
      <h1>Page</h1>
    </div>
  );
}
