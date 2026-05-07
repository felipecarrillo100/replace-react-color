export const loopable = (i: number, length: number) => {
  const props: any = {};
  const setProp = (name: string, value: any = true) => {
    props[name] = value;
  };

  if (i === 0) setProp('first-child');
  if (i === length - 1) setProp('last-child');
  if (i === 0 || i % 2 === 0) setProp('even');
  if (Math.abs(i % 2) === 1) setProp('odd');
  setProp('nth-child', i);

  return props;
};

export default loopable;
