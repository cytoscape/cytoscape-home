import { AppScreen } from "../AppScreen";
import { bodyAnimation, headerAnimation } from "../utilities/animationConfigs";
import {
  MotionAppScreenBody,
  MotionAppScreenHeader,
} from "../utilities/appScreenConfig";

export const NetworkScreen = (props) => {
  return (
    <AppScreen title="H.Sapiens Genes" className="w-full">
      <MotionAppScreenHeader {...(props.animated ? headerAnimation : {})}>
        <AppScreen.Title>Edit Network</AppScreen.Title>
        <AppScreen.Subtitle>
          Change colors, shapes, layout, etc.
        </AppScreen.Subtitle>
      </MotionAppScreenHeader>
      <MotionAppScreenBody
        {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}
      >
        <div className="px-4 py-2">
          <svg x="0" y="0" width="95%" viewBox="0, 0, 300, 300">
            <path
              d="M256.437,96.94 L222.281,109.592"
              fillOpacity="0"
              stroke="#90cbe9"
              strokeWidth="2.571"
              strokeOpacity="0.5"
            />
            <path
              d="M148.207,80.028 L142.193,33.261"
              fillOpacity="0"
              stroke="#90cbe9"
              strokeWidth="1.155"
              strokeOpacity="0.5"
            />
            <path
              d="M154.391,88.692 L193.682,108.102"
              fillOpacity="0"
              stroke="#90cbe9"
              strokeWidth="4.857"
              strokeOpacity="0.5"
            />
            <path
              d="M218.919,168.296 L210.883,130.263"
              fillOpacity="0"
              stroke="#90cbe9"
              strokeWidth="2.981"
              strokeOpacity="0.5"
            />
            <path
              d="M120.145,214.751 L197.378,126.728"
              fillOpacity="0"
              stroke="#90cbe9"
              strokeWidth="1.671"
              strokeOpacity="0.5"
            />
            <path
              d="M193.621,121.79 L85.678,173.936"
              fillOpacity="0"
              stroke="#90cbe9"
              strokeWidth="1.324"
              strokeOpacity="0.5"
            />
            <path
              d="M216.96,177.601 L196.675,205.821"
              fillOpacity="0"
              stroke="#90cbe9"
              strokeWidth="1.581"
              strokeOpacity="0.5"
            />
            <path
              d="M215.251,171.254 L106.023,122.27"
              fillOpacity="0"
              stroke="#90cbe9"
              strokeWidth="1.549"
              strokeOpacity="0.5"
            />
            <path
              d="M215.255,175.517 L122.169,217.487"
              fillOpacity="0"
              stroke="#90cbe9"
              strokeWidth="1.482"
              strokeOpacity="0.5"
            />
            <path
              d="M144.025,82.562 L106.82,56.601"
              fillOpacity="0"
              stroke="#90cbe9"
              strokeWidth="4.204"
              strokeOpacity="0.5"
            />
            <path
              d="M113.054,228.615 L105.822,260.142"
              fillOpacity="0"
              stroke="#90cbe9"
              strokeWidth="1.618"
              strokeOpacity="0.5"
            />
            <path
              d="M176.935,207.084 L102.436,127.287"
              fillOpacity="0"
              stroke="#90cbe9"
              strokeWidth="1.252"
              strokeOpacity="0.5"
            />
            <path
              d="M105.616,108.671 L143.625,88.814"
              fillOpacity="0"
              stroke="#90cbe9"
              strokeWidth="3.976"
              strokeOpacity="0.5"
            />
            <path
              d="M113.125,212.945 L95.143,131.118"
              fillOpacity="0"
              stroke="#90cbe9"
              strokeWidth="1.479"
              strokeOpacity="0.5"
            />
            <path
              d="M81.396,170.652 L88.887,131.208"
              fillOpacity="0"
              stroke="#90cbe9"
              strokeWidth="1.681"
              strokeOpacity="0.5"
            />
            <path
              d="M122.875,220.533 L171.991,218.975"
              fillOpacity="0"
              stroke="#90cbe9"
              strokeWidth="2.772"
              strokeOpacity="0.5"
            />
            <path
              d="M74.3,177.069 L39.563,180.112"
              fillOpacity="0"
              stroke="#90cbe9"
              strokeWidth="1.276"
              strokeOpacity="0.5"
            />
            <path
              d="M83.97,181.272 L109.904,214.46"
              fillOpacity="0"
              stroke="#90cbe9"
              strokeWidth="1.594"
              strokeOpacity="0.5"
            />
            <path
              d="M147.495,91.871 L116.82,213.003"
              fillOpacity="0"
              stroke="#90cbe9"
              strokeWidth="1.136"
              strokeOpacity="0.5"
            />
            <path
              d="M285.11,91.024 C285.11,99.061 278.594,105.576 270.558,105.576 C262.521,105.576 256.006,99.061 256.006,91.024 C256.006,82.987 262.521,76.472 270.558,76.472 C278.594,76.472 285.11,82.987 285.11,91.024 z"
              fill="#2f97c8"
            />
            <text transform="matrix(1.124, 0, 0, 1.124, 270.725, 114.045)">
              <tspan
                x="-12.502"
                y="2.5"
                fontFamily="Helvetica"
                fontSize="9"
                fill="#2079a9"
              >
                MSH2
              </tspan>
            </text>
            <path
              d="M154.257,17.297 C154.257,25.334 147.742,31.849 139.705,31.849 C131.668,31.849 125.153,25.334 125.153,17.297 C125.153,9.26 131.668,2.745 139.705,2.745 C147.742,2.745 154.257,9.26 154.257,17.297 z"
              fill="#2079a9"
            />
            <text transform="matrix(1.124, 0, 0, 1.124, 140.112, 39.85)">
              <tspan
                x="-12.502"
                y="2.5"
                fontFamily="Helvetica"
                fontSize="9"
                fill="#2079a9"
              >
                MSH6
              </tspan>
            </text>
            <path
              d="M221.712,114.508 C221.712,122.545 215.197,129.06 207.16,129.06 C199.124,129.06 192.609,122.545 192.609,114.508 C192.609,106.471 199.124,99.956 207.16,99.956 C215.197,99.956 221.712,106.471 221.712,114.508 z"
              fill="#2079a9"
            />
            <text transform="matrix(1.124, 0, 0, 1.124, 207.19, 137.061)">
              <tspan
                x="-12.004"
                y="2.5"
                fontFamily="Helvetica"
                fontSize="9"
                fill="#2079a9"
              >
                MLH1
              </tspan>
            </text>
            <path
              d="M223.651,172.881 C223.651,175.177 221.789,177.038 219.493,177.038 C217.197,177.038 215.335,175.177 215.335,172.881 C215.335,170.584 217.197,168.723 219.493,168.723 C221.789,168.723 223.651,170.584 223.651,172.881 z"
              fill="#2f97c8"
            />
            <text transform="matrix(1.124, 0, 0, 1.124, 220.071, 185.039)">
              <tspan
                x="-12.502"
                y="2.5"
                fontFamily="Helvetica"
                fontSize="9"
                fill="#2079a9"
              >
                MSH5
              </tspan>
            </text>
            <path
              d="M106.518,52.166 C106.518,55.39 103.905,58.003 100.681,58.003 C97.457,58.003 94.844,55.39 94.844,52.166 C94.844,48.942 97.457,46.329 100.681,46.329 C103.905,46.329 106.518,48.942 106.518,52.166 z"
              fill="#2f97c8"
            />
            <text transform="matrix(1.124, 0, 0, 1.124, 101.292, 66.004)">
              <tspan
                x="-14.177"
                y="2.5"
                fontFamily="Helvetica"
                fontSize="9"
                fill="#2079a9"
              >
                SPO11
              </tspan>
            </text>
            <path
              d="M113.485,271.195 C113.485,277.167 108.644,282.008 102.672,282.008 C96.7,282.008 91.858,277.167 91.858,271.195 C91.858,265.223 96.7,260.382 102.672,260.382 C108.644,260.382 113.485,265.223 113.485,271.195 z"
              fill="#2f97c8"
            />
            <text transform="matrix(1.124, 0, 0, 1.124, 102.702, 290.01)">
              <tspan
                x="-12.004"
                y="2.5"
                fontFamily="Helvetica"
                fontSize="9"
                fill="#2079a9"
              >
                MLH3
              </tspan>
            </text>
            <path
              d="M105.848,115.391 C105.848,123.427 99.333,129.942 91.296,129.942 C83.26,129.942 76.744,123.427 76.744,115.391 C76.744,107.354 83.26,100.839 91.296,100.839 C99.333,100.839 105.848,107.354 105.848,115.391 z"
              fill="#2079a9"
            />
            <text transform="matrix(1.124, 0, 0, 1.124, 91.291, 137.944)">
              <tspan
                x="-12.751"
                y="2.5"
                fontFamily="Helvetica"
                fontSize="9"
                fill="#2079a9"
              >
                DMC1
              </tspan>
            </text>
            <path
              d="M201.627,217.981 C201.627,226.018 195.112,232.533 187.075,232.533 C179.038,232.533 172.523,226.018 172.523,217.981 C172.523,209.944 179.038,203.429 187.075,203.429 C195.112,203.429 201.627,209.944 201.627,217.981 z"
              fill="#2079a9"
            />
            <text transform="matrix(1.124, 0, 0, 1.124, 187.011, 240.534)">
              <tspan
                x="-14.506"
                y="2.5"
                fontFamily="Helvetica"
                fontSize="9"
                fill="#2079a9"
              >
                RAD51
              </tspan>
            </text>
            <path
              d="M38.054,180.297 C38.054,184.058 35.004,187.108 31.243,187.108 C27.481,187.108 24.431,184.058 24.431,180.297 C24.431,176.535 27.481,173.486 31.243,173.486 C35.004,173.486 38.054,176.535 38.054,180.297 z"
              fill="#2f97c8"
            />
            <text transform="matrix(1.124, 0, 0, 1.124, 31.179, 195.109)">
              <tspan
                x="-14.506"
                y="2.5"
                fontFamily="Helvetica"
                fontSize="9"
                fill="#2079a9"
              >
                RAD52
              </tspan>
            </text>
            <path
              d="M84.736,176.046 C84.736,178.785 82.515,181.005 79.776,181.005 C77.037,181.005 74.817,178.785 74.817,176.046 C74.817,173.307 77.037,171.086 79.776,171.086 C82.515,171.086 84.736,173.307 84.736,176.046 z"
              fill="#2f97c8"
            />
            <text transform="matrix(1.124, 0, 0, 1.124, 79.527, 189.006)">
              <tspan
                x="-12.751"
                y="2.5"
                fontFamily="Helvetica"
                fontSize="9"
                fill="#2079a9"
              >
                MND1
              </tspan>
            </text>
            <path
              d="M121.34,220.288 C121.34,224.149 118.21,227.279 114.349,227.279 C110.488,227.279 107.358,224.149 107.358,220.288 C107.358,216.427 110.488,213.297 114.349,213.297 C118.21,213.297 121.34,216.427 121.34,220.288 z"
              fill="#2f97c8"
            />
            <text transform="matrix(1.124, 0, 0, 1.124, 115.455, 235.28)">
              <tspan
                x="-15.005"
                y="2.5"
                fontFamily="Helvetica"
                fontSize="9"
                fill="#2079a9"
              >
                BRCA2
              </tspan>
            </text>
            <path
              d="M153.476,85.517 C153.476,88.278 151.238,90.516 148.477,90.516 C145.716,90.516 143.478,88.278 143.478,85.517 C143.478,82.756 145.716,80.518 148.477,80.518 C151.238,80.518 153.476,82.756 153.476,85.517 z"
              fill="#2f97c8"
            />
            <text transform="matrix(1.124, 0, 0, 1.124, 148.791, 98.518)">
              <tspan
                x="-14.673"
                y="2.5"
                fontFamily="Helvetica"
                fontSize="9"
                fill="#2079a9"
              >
                MRE11
              </tspan>
            </text>
          </svg>
        </div>
      </MotionAppScreenBody>
    </AppScreen>
  );
};
