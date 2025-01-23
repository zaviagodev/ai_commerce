import { DashboardGreeting } from "../components/dashboard-greeting";
import { OnboardingGuide } from "../components/onboarding-guide";

export function DashboardPage() {
  return (
    <div className="space-y-3">
      <DashboardGreeting />
      <OnboardingGuide />
    </div>
  );
}
