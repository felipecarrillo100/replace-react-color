const cloneDeep = (obj: any) => JSON.parse(JSON.stringify(obj));

export const mergeClasses = (classes: any, activeNames: string[] = []) => {
  const styles = (classes.default && cloneDeep(classes.default)) || {};
  activeNames.forEach((name) => {
    const toMerge = classes[name];
    if (toMerge) {
      for (const key in toMerge) {
        if (Object.prototype.hasOwnProperty.call(toMerge, key)) {
          if (!styles[key]) {
            styles[key] = {};
          }
          styles[key] = { ...styles[key], ...toMerge[key] };
        }
      }
    }
  });
  return styles;
};

export default mergeClasses;
