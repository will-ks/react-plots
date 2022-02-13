import React from 'react';
import { RegionSize } from './SvgPlotArea';

export const Border = React.forwardRef<
  SVGRectElement,
  Props & React.SVGProps<SVGRectElement>
>((props, ref) => {
  const { children, style, drawableRegionInPixels, ...rest } = props;

  return (
    <>
      <rect
        ref={ref}
        x={0}
        width={drawableRegionInPixels.width}
        height={drawableRegionInPixels.height}
        {...rest}
        style={{
          fill: 'none',
          strokeWidth: 1,
          stroke: 'rgb(0,0,0)',
          ...style,
        }}
      />
      {children}
    </>
  );
});

type Props = {
  drawableRegionInPixels: RegionSize;
};

