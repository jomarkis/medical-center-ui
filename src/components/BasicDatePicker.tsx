import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface BasicDatePickerProps {
  label: string;
  value: string;
  onChange: (dateStr: string) => void;
  format: string;
}

export default function BasicDatePicker({
  label,
  value,
  onChange,
  format,
}: BasicDatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label={label}
          value={value ? dayjs(value) : null}
          onChange={(newValue: Dayjs | null) => {
            onChange(newValue ? newValue.format("YYYY-MM-DD") : "");
          }}
          format={format}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
//
