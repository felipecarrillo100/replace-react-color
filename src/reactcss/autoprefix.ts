const transforms: Record<string, (value: any) => any> = {
  borderRadius: (value) => ({
    msBorderRadius: value,
    MozBorderRadius: value,
    OBorderRadius: value,
    WebkitBorderRadius: value,
    borderRadius: value
  }),
  boxShadow: (value) => ({
    msBoxShadow: value,
    MozBoxShadow: value,
    OBoxShadow: value,
    WebkitBoxShadow: value,
    boxShadow: value
  }),
  userSelect: (value) => ({
    WebkitTouchCallout: value,
    KhtmlUserSelect: value,
    MozUserSelect: value,
    msUserSelect: value,
    WebkitUserSelect: value,
    userSelect: value
  }),
  flex: (value) => ({
    WebkitBoxFlex: value,
    MozBoxFlex: value,
    WebkitFlex: value,
    msFlex: value,
    flex: value
  }),
  flexBasis: (value) => ({
    WebkitFlexBasis: value,
    flexBasis: value
  }),
  justifyContent: (value) => ({
    WebkitJustifyContent: value,
    justifyContent: value
  }),
  transition: (value) => ({
    msTransition: value,
    MozTransition: value,
    OTransition: value,
    WebkitTransition: value,
    transition: value
  }),
  transform: (value) => ({
    msTransform: value,
    MozTransform: value,
    OTransform: value,
    WebkitTransform: value,
    transform: value
  }),
  absolute: (value) => {
    const direction = value && value.split(' ');
    return {
      position: 'absolute',
      top: direction && direction[0],
      right: direction && direction[1],
      bottom: direction && direction[2],
      left: direction && direction[3]
    };
  },
  extend: (name, otherElementStyles: any = {}) => {
    const otherStyle = otherElementStyles[name];
    if (otherStyle) {
      return otherStyle;
    }
    return {
      extend: name
    };
  }
};

export const autoprefix = (elements: any) => {
  const prefixed: any = {};
  for (const element in elements) {
    if (Object.prototype.hasOwnProperty.call(elements, element)) {
      const styles = elements[element];
      let expanded: any = {};
      for (const key in styles) {
        if (Object.prototype.hasOwnProperty.call(styles, key)) {
          const value = styles[key];
          const transform = transforms[key];
          if (transform) {
            expanded = { ...expanded, ...transform(value) };
          } else {
            expanded[key] = value;
          }
        }
      }
      prefixed[element] = expanded;
    }
  }
  return prefixed;
};

export default autoprefix;
