import { Margin } from '../components/SvgPlotArea';

export const getRandomId = () => Math.random().toString(36).substring(7);

export const getSizesInPixels = (
  paperSizeInMillimeters: { width: number; height: number },
  penThicknessInMillimeters: number,
  marginInMillimeters: Margin
) => {
  const drawableRegionSize = {
    width: paperSizeInMillimeters.width - marginInMillimeters.horizontal * 2,
    height: paperSizeInMillimeters.height - marginInMillimeters.vertical * 2,
  };

  return {
    drawableRegionInPixels: {
      width: drawableRegionSize.width / penThicknessInMillimeters,
      height: drawableRegionSize.height / penThicknessInMillimeters,
    },
    marginInPixels: {
      horizontal: marginInMillimeters.horizontal / penThicknessInMillimeters,
      vertical: marginInMillimeters.vertical / penThicknessInMillimeters,
    },
  };
};
