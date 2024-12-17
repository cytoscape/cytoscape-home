'use client'

import { AppScreen } from '@/components/AppScreen'

export function AppDemo() {
  return (
    <AppScreen title="Sample Network">
      <AppScreen.Body>
        <div className="p-4">
          <NetworkSvg />
        </div>
      </AppScreen.Body>
    </AppScreen>
  )
}

function NetworkSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0, 0, 610.671, 667.163">
      <style>
        {
          `.edge {
            stroke: #e5f1f9;
            stroke-width: 5;
            fill: none;
          }
          .edge.animation {
            stroke: #ffffff;
            stroke-width: 3;
            stroke-dashoffset: 100%;
            animation: move 4s ease-in-out infinite;
          }
          .node {
            fill: #2f97c8;
            stroke: #e5f1f9;
            stroke-width: 6;
            opacity: 0.75; /* Initially 50% transparent */
            transition: opacity 0.3s ease;
          }
          .label {
            font-family: Helvetica;
            font-size: 3px;
            fill: #f2f9fd;
            visibility: hidden; /* Initially invisible */
          }
          .popover {
            opacity: 0; /* Initially transparent */
            transition: opacity 0.5s ease;
          }
          .popoverFrame {
            fill: #ffffff;
            opacity: 0.75;
            stroke: #000000;
            stroke-width: 4;
            stroke-linecap: round;
            stroke-linejoin: round;
          }
          .popoverText {
            font-family: Helvetica;
            font-size: 13.5px;
            kerning: 0;
            fill: rgb(82 82 82);
          }
          .nodeGroup:hover {
            cursor: pointer;
            .node {
              fill: #2079a9;
              opacity: 1; /* Fully opaque on hover */
            }
            .label {
              visibility: visible;
            }
            .popover {
              opacity: 1;
            }
          }
          @keyframes move {
            0% { stroke-dasharray: 0 100%; }
            100% { stroke-dasharray: 100% 100%; }
          }`
        }
      </style>
      <g>
        <g>
          <path d="M373.419,286.64 L479.488,156.377 " className="edge"/>
          <path d="M373.419,286.64 L479.488,156.377 " className="edge animation"/>
        </g>
        <g>
          <path d="M386.925,346.557 L491.326,396.216" className="edge"/>
          <path d="M386.925,346.557 L491.326,396.216" className="edge animation"/>
        </g>
        <g>
          <path d="M326.809,372.537 L275.886,530.985" className="edge"/>
          <path d="M326.809,372.537 L275.886,530.985" className="edge animation"/>
        </g>
        <g>
          <path d="M352.452,373.815 L388.03,539.676" className="edge"/>
          <path d="M352.452,373.815 L388.03,539.676" className="edge animation"/>
        </g>
        <g>
          <path d="M391.256,332.165 L533.497,352.292" className="edge"/>
          <path d="M391.256,332.165 L533.497,352.292" className="edge animation"/>
        </g>
        <g>
          <path d="M315.029,366.956 L248.388,470.043" className="edge"/>
          <path d="M315.029,366.956 L248.388,470.043" className="edge animation"/>
        </g>
        <g>
          <path d="M333.843,276.152 L300.233,74.618" className="edge"/>
          <path d="M333.843,276.152 L300.233,74.618" className="edge animation"/>
        </g>
        <g>
          <path d="M298.57,301.027 L107.679,194.84" className="edge"/>
          <path d="M298.57,301.027 L107.679,194.84" className="edge animation"/>
        </g>
        <g>
          <path d="M293.515,314.271 L188.852,290.695" className="edge"/>
          <path d="M293.515,314.271 L188.852,290.695" className="edge animation"/>
        </g>
        <g>
          <path d="M359.039,278.477 L411.588,134.19" className="edge"/>
          <path d="M359.039,278.477 L411.588,134.19" className="edge animation"/>
        </g>
        <g>
          <path d="M390.626,314.704 L520.263,286.712" className="edge"/>
          <path d="M390.626,314.704 L520.263,286.712" className="edge animation"/>
        </g>
        <g>
          <path d="M373.567,363.634 L408.129,405.748" className="edge"/>
          <path d="M373.567,363.634 L408.129,405.748" className="edge animation"/>
        </g>
        <g>
          <path d="M339.582,374.861 L328.864,592.93" className="edge"/>
          <path d="M339.582,374.861 L328.864,592.93" className="edge animation"/>
        </g>
        <g>
          <path d="M384.137,298.763 L515.676,216.196" className="edge"/>
          <path d="M384.137,298.763 L515.676,216.196" className="edge animation"/>
        </g>
        <g>
          <path d="M295.147,341.782 L73.762,420.105" className="edge"/>
          <path d="M295.147,341.782 L73.762,420.105" className="edge animation"/>
        </g>
        <g>
          <path d="M304.35,357.65 L148.671,491.752" className="edge"/>
          <path d="M304.35,357.65 L148.671,491.752" className="edge animation"/>
        </g>
        <g>
          <path d="M314.535,283.764 L239.263,170.301" className="edge"/>
          <path d="M314.535,283.764 L239.263,170.301" className="edge animation"/>
        </g>
        <g>
          <path d="M292.317,326.526 L94.909,331.801" className="edge"/>
          <path d="M292.317,326.526 L94.909,331.801" className="edge animation"/>
        </g>
        <path d="M307.987,600.68 L286.688,578.274" className="edge"/>
        <path d="M349.446,603.366 L372.024,585.059" className="edge"/>
        <path d="M100.026,158.663 L145.999,97.714" className="edge"/>
        <path d="M268.073,52.741 L190.478,69.348" className="edge"/>
        <path d="M205.291,498.039 L155.204,505.878" className="edge"/>
        <path d="M279.051,69.622 L240.274,122.975" className="edge"/>
        <path d="M110.399,174.355 L195.365,153.238" className="edge"/>
        <path d="M136.26,297.255 L91.865,319.791" className="edge"/>
        <path d="M143.94,306.626 L64.587,407.298" className="edge"/>
        <path d="M61.115,360.188 L52.676,401.78" className="edge"/>
        <path d="M67.012,449.672 L107.193,490.137" className="edge"/>
      </g>
      <g>
        <g className="nodeGroup">
          <path d="M522.279,133.967 C522.279,148.023 510.885,159.417 496.829,159.417 C482.773,159.417 471.378,148.023 471.378,133.967 C471.378,119.911 482.773,108.516 496.829,108.516 C510.885,108.516 522.279,119.911 522.279,133.967 z" className="node"/>
          <text transform="matrix(2.804, 0, 0, 2.804, 499.27, 135.744)">
            <tspan x="-4.751" y="0.5" className="label">AREG</tspan>
          </text>
        </g>
        <g className="nodeGroup">
          <path d="M541.983,407.896 C541.983,422.008 530.543,433.448 516.432,433.448 C502.32,433.448 490.881,422.008 490.881,407.896 C490.881,393.785 502.32,382.345 516.432,382.345 C530.543,382.345 541.983,393.785 541.983,407.896 z" className="node"/>
          <text transform="matrix(2.804, 0, 0, 2.804, 517.92, 409.674)">
            <tspan x="-6.253" y="0.5" className="label">AKR1B1</tspan>
          </text>
        </g>
        <g className="nodeGroup">
          <path d="M292.155,557.334 C292.155,571.361 280.784,582.732 266.758,582.732 C252.731,582.732 241.36,571.361 241.36,557.334 C241.36,543.308 252.731,531.937 266.758,531.937 C280.784,531.937 292.155,543.308 292.155,557.334 z" className="node"/>
          <text transform="matrix(2.804, 0, 0, 2.804, 267.537, 559.112)">
            <tspan x="-4.75" y="0.5" className="label">MND1</tspan>
          </text>
        </g>
        <g className="nodeGroup">
          <path d="M418.878,566.779 C418.878,580.821 407.494,592.205 393.452,592.205 C379.409,592.205 368.025,580.821 368.025,566.779 C368.025,552.736 379.409,541.352 393.452,541.352 C407.494,541.352 418.878,552.736 418.878,566.779 z" className="node"/>
          <text transform="matrix(2.804, 0, 0, 2.804, 394.821, 568.556)">
            <tspan x="-5.086" y="0.5" className="label">TEX15</tspan>
          </text>
        </g>
        <g className="nodeGroup">
          <path d="M589.671,355.979 C589.671,370.936 577.546,383.062 562.589,383.062 C547.631,383.062 535.506,370.936 535.506,355.979 C535.506,341.022 547.631,328.897 562.589,328.897 C577.546,328.897 589.671,341.022 589.671,355.979 z" className="node"/>
          <text transform="matrix(2.804, 0, 0, 2.804, 564.227, 357.756)">
            <tspan x="-5.059" y="0.5" className="label">PALB2</tspan>
          </text>
        </g>
        <g className="nodeGroup">
          <path d="M187.797,74.74 C187.797,88.739 176.449,100.087 162.451,100.087 C148.452,100.087 137.104,88.739 137.104,74.74 C137.104,60.741 148.452,49.393 162.451,49.393 C176.449,49.393 187.797,60.741 187.797,74.74 z" className="node"/>
          <text transform="matrix(2.804, 0, 0, 2.804, 163.994, 76.517)">
            <tspan x="-5.335" y="0.5" className="label">FANCL</tspan>
          </text>
        </g>
        <g className="nodeGroup">
          <path d="M257.953,493.185 C257.953,507.185 246.604,518.534 232.605,518.534 C218.605,518.534 207.256,507.185 207.256,493.185 C207.256,479.186 218.605,467.837 232.605,467.837 C246.604,467.837 257.953,479.186 257.953,493.185 z" className="node"/>
          <text transform="matrix(2.804, 0, 0, 2.804, 233.84, 494.963)">
            <tspan x="-5.391" y="0.5" className="label">MRE11</tspan>
          </text>
        </g>
        <g className="nodeGroup">
          <path d="M320.45,46.349 C320.45,60.348 309.101,71.697 295.102,71.697 C281.102,71.697 269.753,60.348 269.753,46.349 C269.753,32.349 281.102,21 295.102,21 C309.101,21 320.45,32.349 320.45,46.349 z" className="node"/>
          <text transform="matrix(2.804, 0, 0, 2.804, 297.075, 48.126)">
            <tspan x="-5.502" y="0.5" className="label">FANCE</tspan>
          </text>
        </g>
        <g className="nodeGroup">
          <path d="M107.926,180.649 C107.926,194.655 96.572,206.009 82.566,206.009 C68.56,206.009 57.206,194.655 57.206,180.649 C57.206,166.643 68.56,155.288 82.566,155.288 C96.572,155.288 107.926,166.643 107.926,180.649 z" className="node"/>
          <text transform="matrix(2.804, 0, 0, 2.804, 83.849, 182.426)">
            <tspan x="-3.389" y="0.5" className="label">ATR</tspan>
          </text>
        </g>
        <g className="nodeGroup">
          <path d="M186.236,284.006 C186.236,298.012 174.882,309.367 160.875,309.367 C146.868,309.367 135.514,298.012 135.514,284.006 C135.514,269.999 146.868,258.644 160.875,258.644 C174.882,258.644 186.236,269.999 186.236,284.006 z" className="node"/>
          <text transform="matrix(2.804, 0, 0, 2.804, 161.805, 285.783)">
            <tspan x="-5.335" y="0.5" className="label">RAD50</tspan>
          </text>
        </g>
        <g className="nodeGroup">
          <path d="M91.615,332.054 C91.615,346.078 80.246,357.447 66.222,357.447 C52.197,357.447 40.829,346.078 40.829,332.054 C40.829,318.03 52.197,306.661 66.222,306.661 C80.246,306.661 91.615,318.03 91.615,332.054 z" className="node"/>
          <text transform="matrix(2.804, 0, 0, 2.804, 68.934, 333.831)">
            <tspan x="-5.419" y="0.5" className="label">RBBP8</tspan>
          </text>
        </g>
        <g className="nodeGroup">
          <path d="M446.14,107.188 C446.14,121.216 434.768,132.589 420.74,132.589 C406.712,132.589 395.339,121.216 395.339,107.188 C395.339,93.16 406.712,81.788 420.74,81.788 C434.768,81.788 446.14,93.16 446.14,107.188 z" className="node"/>
          <text transform="matrix(2.804, 0, 0, 2.804, 421.304, 108.965)">
            <tspan x="-5.838" y="0.5" className="label">S100A7</tspan>
          </text>
        </g>
        <g className="nodeGroup">
          <path d="M572.867,280.245 C572.867,294.311 561.465,305.713 547.399,305.713 C533.333,305.713 521.93,294.311 521.93,280.245 C521.93,266.179 533.333,254.776 547.399,254.776 C561.465,254.776 572.867,266.179 572.867,280.245 z" className="node"/>
          <text transform="matrix(2.804, 0, 0, 2.804, 549.372, 282.022)">
            <tspan x="-5.25" y="0.5" className="label">CSTF1</tspan>
          </text>
        </g>
        <g className="nodeGroup">
          <path d="M451.056,427.113 C451.056,441.186 439.647,452.595 425.574,452.595 C411.501,452.595 400.092,441.186 400.092,427.113 C400.092,413.04 411.501,401.632 425.574,401.632 C439.647,401.632 451.056,413.04 451.056,427.113 z" className="node"/>
          <text transform="matrix(2.804, 0, 0, 2.804, 427.257, 428.89)">
            <tspan x="-6.336" y="0.5" className="label">UBE2D3</tspan>
          </text>
        </g>
        <g className="nodeGroup">
          <path d="M352.457,620.681 C352.457,634.755 341.049,646.163 326.976,646.163 C312.902,646.163 301.494,634.755 301.494,620.681 C301.494,606.608 312.902,595.2 326.976,595.2 C341.049,595.2 352.457,606.608 352.457,620.681 z" className="node"/>
          <text transform="matrix(2.804, 0, 0, 2.804, 327.905, 622.459)">
            <tspan x="-5.335" y="0.5" className="label">RAD51</tspan>
          </text>
        </g>
        <g className="nodeGroup">
          <path d="M564.664,200.644 C564.664,214.732 553.243,226.152 539.156,226.152 C525.068,226.152 513.648,214.732 513.648,200.644 C513.648,186.557 525.068,175.136 539.156,175.136 C553.243,175.136 564.664,186.557 564.664,200.644 z" className="node"/>
          <text transform="matrix(2.804, 0, 0, 2.804, 541.049, 202.422)">
            <tspan x="-6.087" y="0.5" className="label">UBE2L3</tspan>
          </text>
        </g>
        <g className="nodeGroup">
          <path d="M72.081,429.059 C72.081,443.164 60.646,454.599 46.54,454.599 C32.435,454.599 21,443.164 21,429.059 C21,414.953 32.435,403.518 46.54,403.518 C60.646,403.518 72.081,414.953 72.081,429.059 z" className="node"/>
          <text transform="matrix(2.804, 0, 0, 2.804, 47.517, 430.836)">
            <tspan x="-4.75" y="0.5" className="label">MDC1</tspan>
          </text>
        </g>
        <g className="nodeGroup">
          <path d="M152.241,509.765 C152.241,523.882 140.797,535.326 126.68,535.326 C112.563,535.326 101.118,523.882 101.118,509.765 C101.118,495.648 112.563,484.203 126.68,484.203 C140.797,484.203 152.241,495.648 152.241,509.765 z" className="node"/>
          <text transform="matrix(2.804, 0, 0, 2.804, 128.378, 511.542)">
            <tspan x="-6.92" y="0.5" className="label">TP53BP1</tspan>
          </text>
        </g>
        <g className="nodeGroup">
          <path d="M248.846,145.787 C248.846,160.154 237.199,171.801 222.832,171.801 C208.465,171.801 196.818,160.154 196.818,145.787 C196.818,131.42 208.465,119.773 222.832,119.773 C237.199,119.773 248.846,131.42 248.846,145.787 z" className="node"/>
          <text transform="matrix(2.804, 0, 0, 2.804, 225.1, 147.564)">
            <tspan x="-6.392" y="0.5" className="label">TOPBP1</tspan>
          </text>
        </g>
        <g className="nodeGroup">
          <path d="M388.442,324.698 C388.442,350.611 367.436,371.617 341.523,371.617 C315.61,371.617 294.604,350.611 294.604,324.698 C294.604,298.785 315.61,277.779 341.523,277.779 C367.436,277.779 388.442,298.785 388.442,324.698 z" className="node"/>
          <text transform="matrix(2.804, 0, 0, 2.804, 343.399, 326.475)">
            <tspan x="-5.502" y="0.5" className="label">BRCA1</tspan>
          </text>
          <g className="popover">
            <path d="M75.012,408.345 C70.594,408.345 67.012,404.763 67.012,400.345 L67.012,334.526 C67.012,330.108 70.594,326.526 75.012,326.526 L282.148,326.526 L263.833,340.361 L263.833,400.345 C263.833,404.763 260.252,408.345 255.833,408.345 L75.012,408.345 z" className="popoverFrame"/>
            <text transform="matrix(1, 0, 0, 1, 166.842, 366.935)" className="popoverText">
              <tspan x="-91.068" y="-19.497">BRCA1 mutations in the </tspan>
              <tspan x="-91.068" y="-3.497">germline have become a </tspan>
              <tspan x="-91.068" y="12.503">hallmark for hereditary breast </tspan>
              <tspan x="-91.068" y="28.503">and ovarian cancers.</tspan>
            </text>
          </g>
        </g>
      </g>
    </svg>
  );
}
