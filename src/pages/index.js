import PerformanceDisplay from "@/components/home/PerformanceDisplay";
import Footer from "@/components/all/Footer";
import Table from "@/components/home/Table";
import PieChart from "@/components/home/PieChart";
export default function IndexPage() {
    return (
      <div>
      <PerformanceDisplay />
      <PieChart/>
      <Table/>
      <Footer/>
      </div>
    )
  }
  