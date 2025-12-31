import { useThemeColor } from "@/hooks/use-theme-color";
import { hexWithAlpha } from "@shared/constants/theme/lib/colors";
import { cn } from "@/lib/utils";
import { View, ViewStyle, DimensionValue } from "react-native";
import tw from "twrnc";
import { parseThemeColorFromClassName } from "@shared/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Shimmer, ShimmerProps } from "./shimmer";

type SkeletonProps = {
  width?: number | string;
  height?: number;
  className?: string;
  shimmerProps?: Omit<ShimmerProps, "children">;
};

export function Skeleton({ width, height, className, shimmerProps }: SkeletonProps) {
  const colorScheme = useColorScheme();
  const foregroundColor = useThemeColor({}, 'foreground');
  const placeholderColor = useThemeColor({}, 'placeholder');

  // Parse theme colors from className
  const { processedClassName } = parseThemeColorFromClassName(className, colorScheme);

  // Build className with default styles
  const defaultClassName = "rounded-md";
  const classNameParts = [defaultClassName, processedClassName];
  const finalClassName = cn(...classNameParts);
  const inputStyles = tw`${finalClassName}`;

  // Apply width and height via style only if explicitly provided as props
  // This allows className to control width/height when props are not provided
  const dynamicStyle: ViewStyle = {
    ...(width !== undefined && { width: width as DimensionValue }),
    ...(height !== undefined && { height }),
    ...(foregroundColor && { backgroundColor: hexWithAlpha(foregroundColor, 0.1) }),
  };

  return (
    <Shimmer tintColor={placeholderColor} {...shimmerProps}>
      <View style={[inputStyles, dynamicStyle]} />
    </Shimmer>
  );
}
