import { Box, LinearProgress } from "@mui/material";
import React from "react";

interface ProgresBarProps {
  active: boolean;
}

const ProgresBar: React.FC<ProgresBarProps> = ({ active }) => {
  return <Box sx={{ width: "100%" }}>{active && <LinearProgress />}</Box>;
};

export default ProgresBar;
