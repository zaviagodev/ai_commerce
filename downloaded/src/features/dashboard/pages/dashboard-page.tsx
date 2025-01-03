import { DashboardGreeting } from "../components/dashboard-greeting";
import { TrialToast } from "@/components/trial-toast";
import { OnboardingGuide } from "../components/onboarding-guide";

export function DashboardPage() {
  return (
    <div className="space-y-3">
      <DashboardGreeting />
      <OnboardingGuide />
      <TrialToast />
    </div>
  );
}