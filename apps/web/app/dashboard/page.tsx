import Navbar from "@/components/Navbar";
import ContributionHeatmap from "../../components/heatmap/ContributionHeap";
import UserCard from "@/components/UseCard";
import TimeCard from "@/components/TimeCard";
import VSCodePage from "@/components/VScodepage";
import SpotifyCard from "@/components/Spotify";
import Sidebar from "@/components/Sidebar";

export default function DashboardPage() {
  return (
    <main
      className="min-h-screen p-8"
      style={{
        background: `
          radial-gradient(ellipse at 15% 25%, rgba(200, 195, 215, 0.95) 0%, transparent 50%),
          radial-gradient(ellipse at 85% 75%, rgba(175, 185, 205, 0.9) 0%, transparent 50%),
          radial-gradient(ellipse at 60% 10%, rgba(225, 218, 230, 0.8) 0%, transparent 45%),
          radial-gradient(ellipse at 30% 80%, rgba(190, 200, 220, 0.7) 0%, transparent 40%),
          radial-gradient(ellipse at 90% 20%, rgba(210, 205, 225, 0.75) 0%, transparent 40%),
          #bfc5d3
        `,
      }}
    >
      <div className="flex">
        <div className="flex-col ">
          <div className="flex gap-12 mb-12 justify-between">
            <UserCard />
            <TimeCard />
            <SpotifyCard />
          </div>
          <div className="flex">
            <ContributionHeatmap />
          </div>
        </div>
        <div className="mt-16">
          <VSCodePage />
        </div>
      </div>
    </main>
  );
}
