import {
  Easel,
  getSizesInPixels,
  PAPER_SIZES_MILLIMETERS,
  SvgPlotArea,
} from '@react-plots/react-plotter-kit';
import { SvgGroup } from '@react-plots/react-plotter-kit/src/components/SvgGroup';
import usePlot from '@react-plots/react-plotter-kit/src/lib/usePlot';
import React from 'react';

const { drawableRegionInPixels, marginInPixels } = getSizesInPixels(
  PAPER_SIZES_MILLIMETERS.a3.vertical,
  0.5,
  {
    horizontal: 20,
    vertical: 20,
  }
);

export default () => {
  const { svgGroupProps, svgPlotAreaProps } = usePlot(
    drawableRegionInPixels,
    marginInPixels
  );
  return (
    <Easel>
      <SvgPlotArea {...svgPlotAreaProps}>
        <SvgGroup {...svgGroupProps} centerContents={true}></SvgGroup>
      </SvgPlotArea>
    </Easel>
  );
};
