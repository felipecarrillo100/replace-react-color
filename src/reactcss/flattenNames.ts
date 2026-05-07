const isString = (val: any) => typeof val === 'string';
const isPlainObject = (val: any) => val !== null && typeof val === 'object' && !Array.isArray(val);

export const flattenNames = (things: any[] = []): string[] => {
  const names: string[] = [];

  things.forEach((thing) => {
    if (Array.isArray(thing)) {
      flattenNames(thing).forEach((name) => names.push(name));
    } else if (isPlainObject(thing)) {
      for (const key in thing) {
        if (Object.prototype.hasOwnProperty.call(thing, key)) {
          const value = thing[key];
          if (value === true) names.push(key);
          names.push(`${key}-${value}`);
        }
      }
    } else if (isString(thing)) {
      names.push(thing);
    }
  });

  return names;
};

export default flattenNames;
