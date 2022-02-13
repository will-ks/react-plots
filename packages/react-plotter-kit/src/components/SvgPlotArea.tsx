import React, { SVGProps } from 'react';
import { getRandomId } from '../helpers/helpers';

export const SvgPlotArea = React.forwardRef<
  SVGSVGElement,
  Props & SVGProps<SVGSVGElement>
>((props, ref) => {
  const {
    children,
    drawableRegionInPixels,
    marginInPixels,
    ...svgProps
  } = props;
  const clipPathId = getRandomId();
  const paperSizeInPixels = {
    width: drawableRegionInPixels.width + marginInPixels.horizontal * 2,
    height: drawableRegionInPixels.height + marginInPixels.vertical * 2,
  };
  return (
    <svg
      {...svgProps}
      viewBox={`0 0 ${paperSizeInPixels.width} ${paperSizeInPixels.height}`}
      ref={ref}
      style={{
        height: paperSizeInPixels.height,
        width: paperSizeInPixels.width,
      }}
    >
      <clipPath id={clipPathId}>
        <rect
          x={0}
          y={0}
          width={drawableRegionInPixels.width}
          height={drawableRegionInPixels.height}
        />
      </clipPath>
      <g
        clipPath={`url(#${clipPathId})`}
        transform={`translate(${marginInPixels.horizontal},${marginInPixels.vertical})`}
      >
        {children}
      </g>
    </svg>
  );
});

export type Margin = { horizontal: number; vertical: number };

export type RegionSize = {
  width: number;
  height: number;
};

type Props = {
  drawableRegionInPixels: RegionSize;
  marginInPixels: Margin;
};

