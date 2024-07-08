import { useCSVReader } from "react-papaparse";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";
type props = {
  onUpload: (res: any) => void;
};
const UploadButton = ({ onUpload }: props) => {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }) => (
        <Button {...getRootProps()} className="w-full lg:w-auto" size={"sm"}>
          <Upload className=" w-6 h-6 " />
          upload{" "}
        </Button>
      )}
    </CSVReader>
  );
};

export default UploadButton;
