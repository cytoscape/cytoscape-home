export const headerAnimation = {
  initial: { opacity: 0, transition: { duration: 0.3 } },
  animate: { opacity: 1, transition: { duration: 0.3, delay: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export const maxZIndex = 2147483647;

export const bodyVariantBackwards = {
  opacity: 0.4,
  scale: 0.8,
  zIndex: 0,
  filter: "blur(4px)",
  transition: { duration: 0.4 },
};

export const bodyVariantForwards = (custom) => ({
  y: "100%",
  zIndex: maxZIndex - custom.changeCount,
  transition: { duration: 0.4 },
});

export const bodyAnimation = {
  initial: "initial",
  animate: "animate",
  exit: "exit",
  variants: {
    initial: (custom, ...props) =>
      custom.isForwards
        ? bodyVariantForwards(custom, ...props)
        : bodyVariantBackwards,
    animate: (custom) => ({
      y: "0%",
      opacity: 1,
      scale: 1,
      zIndex: maxZIndex / 2 - custom.changeCount,
      filter: "blur(0px)",
      transition: { duration: 0.4 },
    }),
    exit: (custom, ...props) =>
      custom.isForwards
        ? bodyVariantBackwards
        : bodyVariantForwards(custom, ...props),
  },
};
