import { modules } from "@/data/modules";
import ModulePageClient from "./ModulePageClient";

// Generate static paths for all modules at build time
export function generateStaticParams() {
  return modules.map((mod) => ({
    id: mod.id,
  }));
}

export default function ModulePage() {
  return <ModulePageClient />;
}
