import React, { SVGProps, useEffect, useRef, useState } from 'react';
import { getRandomId } from '../helpers/helpers';

export const SvgPlotArea = React.forwardRef<
  SVGSVGElement,
  Props & SVGProps<SVGSVGElement>
>((props, forwardedRef) => {
  const {
    children,
    drawableRegionInPixels,
    marginInPixels = { horizontal: 0, vertical: 0 },
    centerContents,
    ...svgProps
  } = props;
  const clipPathId = getRandomId();
  const paperSizeInPixels = {
    width: drawableRegionInPixels.width + marginInPixels.horizontal * 2,
    height: drawableRegionInPixels.height + marginInPixels.vertical * 2,
  };
  const groupRef = useRef<SVGSVGElement>(null);
  const [groupBBoxSize, setGroupBBoxSize] = useState<RegionSize>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    if (!groupRef.current) {
      return;
    }
    const groupBBox = groupRef.current.getBBox();
    setGroupBBoxSize({ width: groupBBox.width, height: groupBBox.height });
  }, [children]);
  return (
    <svg
      ref={forwardedRef}
      {...svgProps}
      viewBox={`0 0 ${paperSizeInPixels.width} ${paperSizeInPixels.height}`}
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
        ref={groupRef}
        clipPath={`url(#${clipPathId})`}
        transform={
          centerContents
            ? `translate(${
                (paperSizeInPixels.width - groupBBoxSize.width) / 2
              },${(paperSizeInPixels.height - groupBBoxSize.height) / 2})`
            : `translate(${marginInPixels.horizontal},${marginInPixels.vertical})`
        }
      >
        {children}
      </g>
    </svg>
  );
});

export type HorizontalVerticalPair = { horizontal: number; vertical: number };

export type RegionSize = {
  width: number;
  height: number;
};

type Props = {
  drawableRegionInPixels: RegionSize;
  marginInPixels?: HorizontalVerticalPair;
  centerContents?: boolean;
};
