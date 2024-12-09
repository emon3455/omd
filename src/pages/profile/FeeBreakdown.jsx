import { useSelector } from "react-redux";
import LineReply from "../../assets/svgs/LineReply";

const FeeBreakdown = ({ dependents }) => {
  const user = useSelector((state) => state.userSlice.user);

  return (
    <div className="rounded-lg border p-3 md:p-5">
      <div className="text-center border-b-2 pb-2 mb-3">
        <h4 className="text-lg font-semibold">Fee Breakdown</h4>
      </div>
      <div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-start">Name</th>
              <th className="text-end">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-start pr-28 text-nowrap pb-2 capitalize">
                {user?.firstName} {user?.lastName}
              </td>
              <td className="text-end font-medium text-green-800">$97</td>
            </tr>
            {dependents?.map((dependent, dependentIdx) => (
              <tr key={dependentIdx}>
                <td className="text-start capitalize w-full pb-2">
                  <LineReply className="fill-green-600" />{" "}
                  {dependent.firstName ? (
                    <span>
                      {dependent.firstName} {dependent.lastName}
                    </span>
                  ) : (
                    dependent.relation
                  )}
                </td>
                <td className="text-end capitalize font-medium text-green-800">
                  $0
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-center border-t-2 pt-2 mt-3 flex justify-between">
          <p className="font-bold">Total</p>
          <p className="font-bold text-green-800">${97}</p>
        </div>
      </div>
    </div>
  );
};

export default FeeBreakdown;
