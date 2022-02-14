import React, { SVGProps } from 'react';
import { RegionSize } from '../lib/usePlot';

export const SvgPlotArea = React.forwardRef<SVGSVGElement, SvgPlotAreaProps>(
  (props, forwardedRef) => {
    const {
      children,
      paperSizeInPixels,
      drawableRegionInPixels,
      clipPathId,
      ...svgProps
    } = props;

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
        {children}
      </svg>
    );
  }
);

type Props = {
  paperSizeInPixels: RegionSize;
  drawableRegionInPixels: RegionSize;
  clipPathId: string;
};
export type SvgPlotAreaProps = Props & Omit<SVGProps<SVGSVGElement>, 'ref'>;
