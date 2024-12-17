import { AppScreen } from "../AppScreen";
import { bodyAnimation, headerAnimation } from "../utilities/animationConfigs";
import {
  MotionAppScreenBody,
  MotionAppScreenHeader,
} from "../utilities/appScreenConfig";

export const ImportScreen = (props) => {
  const data = [
    { source: "MSH6", target: "MRE11", weight: 0.00389 },
    { source: "MRE11", target: "SPO11", weight: 0.02571 },
    { source: "MLH1", target: "MRE11", weight: 0.03111 },
    { source: "MSH2", target: "MLH1", weight: 0.01214 },
    { source: "DMC1", target: "MND1", weight: 0.00475 },
    { source: "RAD51", target: "DMC1", weight: 0.00122 },
    { source: "BRCA2", target: "MLH3", weight: 0.00423 },
    { source: "MND1", target: "BRCA2", weight: 0.00403 },
    { source: "RAD52", target: "MND1", weight: 0.00141 },
  ];

  return (
    <AppScreen className="w-full">
      <MotionAppScreenHeader {...(props.animated ? headerAnimation : {})}>
        <AppScreen.Title>Upload Data</AppScreen.Title>
        <AppScreen.Subtitle>Gene List, Excel, CSV, etc.</AppScreen.Subtitle>
      </MotionAppScreenHeader>
      <MotionAppScreenBody
        {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}
      >
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="whitespace-nowrap py-3.5 pl-4 text-sm font-semibold text-gray-900 xs:text-xs"
              >
                Gene 1
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-2 py-3.5 text-sm font-semibold text-gray-900 xs:text-xs"
              >
                Gene 2
              </th>
              <th
                scope="col"
                className="whitespace-nowrap px-2 py-3.5 text-sm font-semibold text-gray-900 xs:text-xs"
              >
                Weight
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((row, idx) => (
              <tr key={idx}>
                <td className="whitespace-nowrap py-1 pl-4 pr-2 text-center text-sm text-gray-500 xs:text-xs">
                  {row.source}
                </td>
                <td className="whitespace-nowrap py-1 px-2 text-center text-sm text-gray-500 xs:text-xs">
                  {row.target}
                </td>
                <td className="whitespace-nowrap py-1 pl-4 pr-3 text-center text-sm text-gray-500 xs:text-xs">
                  {row.weight}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </MotionAppScreenBody>
    </AppScreen>
  );
};
