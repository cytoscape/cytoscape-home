import { useEffect, useRef } from "react";
import { DataIcon } from "../icon/DataIcon";
import { ImportScreen } from "../screens/ImportScreen";
import { NetworkIcon } from "../icon/NetworkIcon";
import { NetworkScreen } from "../screens/NetworkScreen";
import { PaperIcon } from "../icon/PaperIcon";
import { ExportScreen } from "../screens/ExportScreen";

export const features = [
  {
    name: "Create interactive networks from your data",
    description:
      "Generate interactive visualizations and networks to illustrate relationships between your genes or pathways.",
    icon: DataIcon,
    screen: ImportScreen,
  },
  {
    name: "Analyze the results",
    description:
      "Analyze the networks by customizing their visual attributes and applying layout algorithms in order to reveal meaningful patterns and structures.",
    icon: NetworkIcon,
    screen: NetworkScreen,
  },
  {
    name: "Export figures for publication",
    description:
      "Prepare visualizations and summary reports to communicate the results of the analysis to collaborators and for publication.",
    icon: PaperIcon,
    screen: ExportScreen,
  },
];

export function usePrevious(value) {
  let ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
