import OverviewCard from "./components/OverviewCard";
import RecentQuestions from "./components/RecentQuestions";
import RecentTestPapers from "./components/RecentTestPapers";

export default function Overview() {
  return (
    <div>
      <OverviewCard />

      <div className="flex gap-8 mt-8">
        <div className="flex-1">
          <RecentQuestions />
        </div>
        <div className="flex-1">
          <RecentTestPapers />
        </div>
      </div>
    </div>
  );
}
