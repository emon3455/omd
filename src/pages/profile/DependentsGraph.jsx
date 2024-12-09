import { PencilLine } from "lucide-react";
import {} from "react";
import { useSelector } from "react-redux";
import LineReply from "../../assets/svgs/LineReply";

const DependentsGraph = ({ dependents }) => {
  const user = useSelector((state) => state.userSlice.user);
  return (
    <div className="hidden  w-full rounded-lg border p-3 md:p-5 ">
      <div className="text-center border-b-2 pb-2 mb-3">
        <h4 className="text-lg font-semibold">My Family</h4>
        <p className="text-sm font-medium">(Dependents)</p>
      </div>
      <div>
        <table>
          <thead className="">
            <tr>
              <th className="text-start">Name</th>
              <th className="text-end  w-full">relation</th>
            </tr>
          </thead>
          <div className="pb-3"></div>
          <tbody>
            <tr className="">
              <td className="text-start pr-12 text-nowrap pb-2 capitalize">
                {user?.firstName} {""}
                {user?.lastName}
              </td>
              <td className="text-end">Self</td>
            </tr>{" "}
            {dependents?.map((dependent, dependentIdx) => (
              <tr key={dependentIdx}>
                <td className="text-start pb-2">
                  <LineReply className="fill-green-600" /> {dependent.firstName}{" "}
                  {""}
                  {dependent.lastName}
                </td>
                <td className="text-end capitalize flex items-center justify-end gap-1 pb-2">
                  <PencilLine size={15} className="text-green-600" />{" "}
                  {dependent.relation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DependentsGraph;
