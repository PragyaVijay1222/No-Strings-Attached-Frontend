import { CustomSpinner } from "./CustomSpinner";

export const SpinnerOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/40">
      <CustomSpinner size={8} />
    </div>
  );
};