import { useOutletContext } from "react-router-dom";
import Services from "../../components/Services";
import type { LayoutContext } from "../../layouts/MainLayout";

export default function ServicesPage() {
  const { selectPackage } = useOutletContext<LayoutContext>();
  return (
    <main className="pt-24 md:pt-28">
      <Services onSelectPackage={selectPackage} />
    </main>
  );
}
