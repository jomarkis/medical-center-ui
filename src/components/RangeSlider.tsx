import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

interface RangeSliderProps {
  max?: number;
  min?: number;
  value: number[];
  onChange: (newValue: number[]) => void;
  label?: string;
}

export default function RangeSlider({
  max,
  min,
  value,
  onChange,
  label = "Range",
}: RangeSliderProps) {
  const handleChange = (_event: Event, newValue: number | number[]) => {
    onChange(newValue as number[]);
  };

  return (
    <Box sx={{ width: "100%", padding: "0 10px" }}>
      <Slider
        getAriaLabel={() => label}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
      />
    </Box>
  );
}
