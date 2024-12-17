import CytoscapeLogo from "@/images/logos/cytoscape.svg";
import clsx from "clsx";
import PropTypes from "prop-types";
import { forwardRef } from "react";

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 6h14M5 18h14M5 12h14"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AppScreen({ children, className, ...props }) {
  return (
    <div className={clsx("flex flex-col", className)} {...props}>
      <div className="flex justify-between px-4 text-gray-300">
        <CytoscapeLogo className="h-6 flex-none" color="#d4d4d4" />
        {props.title}
        <MenuIcon className="h-6 w-6 flex-none stroke-gray-300 invisible" />
      </div>
      {children}
    </div>
  );
}
AppScreen.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
};

AppScreen.Header = forwardRef(function AppScreenHeader({ children }, ref) {
  return (
    <div ref={ref} className="mt-2 px-4 text-white">
      {children}
    </div>
  );
});
AppScreen.Header.propTypes = {
  children: PropTypes.node,
};

AppScreen.Title = forwardRef(function AppScreenTitle({ children }, ref) {
  return (
    <div ref={ref} className="text-md md:text-2xl text-white">
      {children}
    </div>
  );
});
AppScreen.Title.propTypes = {
  children: PropTypes.node,
};

AppScreen.Subtitle = forwardRef(function AppScreenSubtitle({ children }, ref) {
  return (
    <div ref={ref} className="text-xs md:text-sm text-gray-500">
      {children}
    </div>
  );
});
AppScreen.Subtitle.propTypes = {
  children: PropTypes.node,
};

AppScreen.Body = forwardRef(function AppScreenBody(
  { children, className },
  ref
) {
  return (
    <div
      ref={ref}
      className={clsx("mt-2 flex-auto rounded-t-md bg-white", className)}
    >
      {children}
    </div>
  );
});
AppScreen.Body.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
