import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { docColumn } from "@/lib/tableColumn";
import { FaSortDown } from "react-icons/fa6";
import { FaSortUp } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { listDocuments } from "@/api/cody";
import folderStore from "@/data/folder";

const DocTable = () => {
  const { selectedFolder } = folderStore((state) => state);
  const { data, isLoading } = useQuery({
    queryKey: ["docs", selectedFolder?.id],
    queryFn: () => listDocuments(selectedFolder?.id),
  });
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data: data || [],
    columns: docColumn,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    initialState: {
      pagination: { pageSize: 5 },
    },
  });
  return (
    <div className="pt-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="font-medium text-gray-500 flex items-center gap-1">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === "asc" ? (
                        <div className="flex flex-col items-center relative ">
                          <FaSortUp className=" absolute text-[0.9rem] -mt-[0.3] " />
                          <FaSortDown className=" text-[0.9rem] text-gray-400" />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center relative ">
                          <FaSortUp className=" absolute text-[0.9rem] -mt-[0.3] text-gray-400" />
                          <FaSortDown className=" text-[0.9rem] " />
                        </div>
                      )
                    ) : (
                      <div className="flex flex-col items-center relative ">
                        <FaSortUp className=" absolute text-[0.9rem] -mt-[0.3] text-gray-400" />
                        <FaSortDown className=" text-[0.9rem] text-gray-400" />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td
                colSpan={table.getAllColumns().length}
                className="text-center text-gray-500 font-medium"
              >
                <div className="mt-14">Fetching documents...</div>
              </td>
            </tr>
          ) : table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={table.getAllColumns().length}
                className="text-center text-gray-500 font-medium py-10"
              >
                No documents found...
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="font-medium"
                  >
                    <div className="text-gray-700 px-6 py-4 whitespace-nowrap dark:text-white select-none">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {table.getPageCount() > 1 && (
        <div className="flex mt-5 gap-5">
          <button
            className={`ml-auto bg-gray-200 px-4 py-3 select-none ${
              table.getCanPreviousPage() ? "" : "pointer-events-none opacity-50"
            }`}
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            Previous Page
          </button>
          <button
            className={`bg-gray-200 px-4 py-3 select-none ${
              table.getCanNextPage() ? "" : "pointer-events-none opacity-50"
            }`}
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Next Page
          </button>
        </div>
      )}
    </div>
  );
};

export default DocTable;
