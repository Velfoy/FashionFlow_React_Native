import { useEffect, useState } from "react";
import { Dimensions, ScaledSize } from "react-native";

interface ResponsiveSize {
  width: number;
  height: number;
  isPortrait: boolean;
  isLandscape: boolean;
  isSmallDevice: boolean;
  isMediumDevice: boolean;
  isLargeDevice: boolean;
  isTablet: boolean;
}

export function useResponsive(): ResponsiveSize {
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get("window");
    return calculateDimensions(width, height);
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window }: { window: ScaledSize }) => {
        setDimensions(calculateDimensions(window.width, window.height));
      }
    );

    return () => subscription?.remove();
  }, []);

  return dimensions;
}

function calculateDimensions(width: number, height: number): ResponsiveSize {
  const isPortrait = height >= width;
  const isLandscape = width > height;
  const isSmallDevice = width < 375;
  const isMediumDevice = width >= 375 && width < 768;
  const isLargeDevice = width >= 768;
  const isTablet = width >= 768;

  return {
    width,
    height,
    isPortrait,
    isLandscape,
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isTablet,
  };
}
