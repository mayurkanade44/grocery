import Button from "./Button";

const Groceries = ({ groceries, handleEdit, handleDelete }) => {
  return (
    <div>
      {groceries?.length < 1 && (
        <p className="text-red-500 text-center text-lg">No groceries found</p>
      )}
      <div className="overflow-y-auto my-4">
        <table className="w-full border whitespace-nowrap border-neutral-500 bg-text">
          <thead>
            <tr className="h-8 w-full leading-none">
              <th className="font-bold text-center border-neutral-500 w-40 border-2 px-3">
                Name
              </th>
              <th className="font-bold text-center border-neutral-500 border-2 px-3">
                Discounted Price
              </th>
              <th className="font-bold text-center border-neutral-500 border-2 px-3">
                Quantity
              </th>
              <th className="font-bold text-center border-neutral-500 border-2 px-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {groceries?.map((grocery) => (
              <tr
                key={grocery._id}
                className="h-8 text-[14px] border-b border-neutral-500 hover:bg-slate-200"
              >
                <td className="px-3 border-r text-center border-neutral-500">
                  {grocery.name}
                </td>
                <td className="px-3 border-r text-center border-neutral-500">
                  {grocery.discountedPrice}
                </td>
                <td className="px-3 border-r text-center border-neutral-500">
                  {grocery.quantity}
                </td>
                <td className="px-3 border-r text-center border-neutral-500">
                  <Button label="Edit" onClick={() => handleEdit(grocery)} />
                  <Button
                    label="Delete"
                    color="bg-red-600"
                    onClick={() => handleDelete(grocery._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Groceries;
