import React, { FC } from 'react'

interface IconProps extends React.SVGAttributes<SVGElement> {
  fill?: string;
  width?: string | number;
  height?: string | number;
}

const DEFAULT_SIZE = 24

export const CheckIcon: FC<IconProps> = ({
  fill = 'currentColor',
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
  style = {},
  ...props
}) => (
  <svg
    viewBox={`0 0 ${DEFAULT_SIZE} ${DEFAULT_SIZE}`}
    style={{ fill, width, height, ...style }}
    {...props}
  >
    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
  </svg>
)

export const UnfoldMoreHorizontalIcon: FC<IconProps> = ({
  fill = 'currentColor',
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
  style = {},
  ...props
}) => (
  <svg
    viewBox={`0 0 ${DEFAULT_SIZE} ${DEFAULT_SIZE}`}
    style={{ fill, width, height, ...style }}
    {...props}
  >
    <path d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z" />
  </svg>
)
