import { useMemo } from 'react';
import { SvgGroupProps } from '../components/SvgGroup';
import { SvgPlotAreaProps } from '../components/SvgPlotArea';
import { getRandomId } from '../helpers/helpers';

const usePlot = (
  drawableRegionInPixels: RegionSize,
  marginInPixels: HorizontalVerticalPair = { horizontal: 0, vertical: 0 }
): { svgPlotAreaProps: SvgPlotAreaProps; svgGroupProps: SvgGroupProps } => {
  const clipPathId = useMemo(() => getRandomId(), []);
  const paperSizeInPixels = {
    width: drawableRegionInPixels.width + marginInPixels.horizontal * 2,
    height: drawableRegionInPixels.height + marginInPixels.vertical * 2,
  };
  return {
    svgPlotAreaProps: {
      drawableRegionInPixels,
      paperSizeInPixels,
      clipPathId,
    },
    svgGroupProps: {
      clipPathId,
      paperSizeInPixels,
      marginInPixels,
    },
  };
};

export default usePlot;
export type HorizontalVerticalPair = { horizontal: number; vertical: number };

export type RegionSize = {
  width: number;
  height: number;
};
