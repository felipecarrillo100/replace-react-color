import flattenNames from './flattenNames';
import mergeClasses from './mergeClasses';
import autoprefix from './autoprefix';
import loopable from './loop';

export const loop = loopable;

export const ReactCSS = (classes: any, ...activations: any[]) => {
  const activeNames = flattenNames(activations);
  const merged = mergeClasses(classes, activeNames);
  return autoprefix(merged);
};

export default ReactCSS;
