import { AppScreen } from "../AppScreen";
import { bodyAnimation, headerAnimation } from "../utilities/animationConfigs";
import {
  MotionAppScreenBody,
  MotionAppScreenHeader,
} from "../utilities/appScreenConfig";

export const ExportScreen = (props) => {
  return (
    <AppScreen title="H.Sapiens Genes" className="w-full">
      <MotionAppScreenHeader {...(props.animated ? headerAnimation : {})}>
        <AppScreen.Title>Export Network</AppScreen.Title>
        <AppScreen.Subtitle>Save it as image or text</AppScreen.Subtitle>
      </MotionAppScreenHeader>
      <MotionAppScreenBody
        {...(props.animated ? { ...bodyAnimation, custom: props.custom } : {})}
      >
        <div className="divide-y divide-gray-100"></div>
      </MotionAppScreenBody>
    </AppScreen>
  );
};
