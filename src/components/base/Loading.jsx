import clsx from "clsx";
import PropTypes from "prop-types";

export function LoadingMessage({ className, ...props }) {
  className = clsx(
    "text-center text-gray-400 animate-pulse from-gray-100 to-gray-500",
    className
  );

  return (
    <div className={className} {...props}>
      Loading...
    </div>
  );
}
LoadingMessage.propTypes = {
  className: PropTypes.string,
};
