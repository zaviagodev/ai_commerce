import { useTranslation } from "@/lib/i18n/hooks";

const Loading = () => {
  const t = useTranslation();
  return (
    <div className="flex flex-col gap-4 items-center justify-center p-10">
      <div className="inline-flex gap-x-2">
        <div className="w-4 h-4 rounded-full bg-darkgray loading-anim opacity-0" />
        <div className="w-4 h-4 rounded-full bg-darkgray loading-anim opacity-0 !delay-100" />
        <div className="w-4 h-4 rounded-full bg-darkgray loading-anim opacity-0 !delay-200" />
      </div>
      <h2 className="text-base text-darkgray">
        {t.dashboard.onboarding.loading}
      </h2>
    </div>
  );
};

export default Loading;
