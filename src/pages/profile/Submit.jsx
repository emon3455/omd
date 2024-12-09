import { useEffect } from "react";
import Button from "../../component/buttons/Button";

const Submit = ({ onSubmit, onCancel, submitting }) => {
  // Scroll to top on inital render
  useEffect(() => {
    const handleScrollToTop = () => window.scrollTo(0, 0);
    handleScrollToTop();
    return () => {};
  }, []);
  return (
    <div className="text-center md:shadow-[0px_0px_3px_1px_rgba(0,0,0,0.1)]  rounded-lg md:p-5 w-fit mx-auto">
      <h3 className="mb-6 text-xl font-semibold ">
        You&apos;re one step away from unlocking comprehensive health benefits.
      </h3>
      <p className="mx-auto md:max-w-2xl opacity-70">
        Ensure all details are correct before you submit. This will activate or
        update your Telehealth and pharmacy program benefits, giving you full
        access to OptimalMD&apos;s health resources. Ready to embrace a
        healthier future?
      </p>
      <div className="flex justify-center w-full gap-3 mt-8 md:gap-4 lg:gap-6">
        <Button
          onClick={onCancel}
          variant="outline"
          className="w-full md:max-w-32"
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          variant="primary"
          className="w-full md:max-w-32"
          disabled={submitting}
        >
          {submitting ? "Updating..." : "Finish"}
        </Button>
      </div>
    </div>
  );
};

export default Submit;
