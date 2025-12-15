import React, { lazy, Suspense } from "react";
import { HOME_SHOWCASE_LINK, navigateTo } from "../utils/navigation";

const ProjectDetail = lazy(() => import("./ProjectDetail"));

const LaunchConsolePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Suspense
        fallback={<div className="min-h-screen bg-cream dark:bg-charcoal" />}
      >
        <ProjectDetail onBack={() => navigateTo(HOME_SHOWCASE_LINK)} />
      </Suspense>
    </div>
  );
};

export default LaunchConsolePage;
