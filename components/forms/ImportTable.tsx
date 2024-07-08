import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HeaderSelect from "./HeaderSelect";

type props = {
  headers: string[];
  body: string[][];
  selectedColumns: Record<number, string | null>;
  onTableHeadSelectChange: (columnIndx: number, value: string | null) => void;
};

const ImportTable = ({
  body,
  headers,
  onTableHeadSelectChange,
  selectedColumns,
}: props) => {
  return (
    <div className=" h-screen overflow-auto" >
      {" "}
      <Table>
        <TableCaption className=" mb-6">A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            {headers?.map((e, i) => (
              <TableHead>
                <HeaderSelect
                  onChange={onTableHeadSelectChange}
                  columnIndex={i}
                  selectedColumns={selectedColumns}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body?.map((array: string[], i) => (
            <TableRow key={i}>
              {array.map((el) => (
                <TableCell className=" max-lg:text-xs"  key={el}>{el}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ImportTable;
