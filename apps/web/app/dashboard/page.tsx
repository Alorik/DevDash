import Navbar from "@/components/Navbar";
import ContributionHeatmap from "../../components/heatmap/ContributionHeap";
import UserCard from "@/components/UseCard";

export default function DashboardPage() {
  return (
    <main className="p-8">
      <UserCard />
      <ContributionHeatmap />
    </main>
  );
}
