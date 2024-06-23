import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect
} from "react";
import "./css/ProgressBar.css";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import { useCountUp } from "use-count-up";

const ProgressBar = forwardRef(({ percentage, progressStart }, ref) => {
  const [currentPercentage, setCurrentPercentage] = useState(percentage);

  const { value, reset } = useCountUp({
    isCounting: true,
    duration: 1.5,
    start: progressStart ? progressStart : 0,
    end: currentPercentage
  });

  useEffect(() => {
    setCurrentPercentage(percentage);
    reset();
  }, [percentage, reset]);

  useImperativeHandle(ref, () => ({
    updateProgress: (newPercentage) => {
      setCurrentPercentage(newPercentage);
      reset();
    }
  }));

  return (
    <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={8}>
      <Stack spacing={2}>
        <CircularProgress size="lg" determinate value={value}>
          <Typography>{Math.round(value)}%</Typography>
        </CircularProgress>
      </Stack>
    </Stack>
  );
});

export default ProgressBar;
