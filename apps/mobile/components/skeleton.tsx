import { cn } from "@/lib/utils";
import { View, ViewStyle, DimensionValue } from "react-native";
import { Shimmer, ShimmerProps } from "./shimmer";

type SkeletonProps = {
  width?: number | string;
  height?: number;
  className?: string;
  shimmerProps?: Omit<ShimmerProps, "children">;
};

/**
 * Skeleton loading placeholder component with shimmer animation.
 *
 * @example
 * <Skeleton className="w-full h-12" />
 * <Skeleton width={100} height={20} />
 * <Skeleton className="w-24 h-24 rounded-full" />
 */
export function Skeleton({ width, height, className, shimmerProps }: SkeletonProps) {
  // Apply width and height via style only if explicitly provided as props
  // This allows className to control dimensions when props are not provided
  const dynamicStyle: ViewStyle = {
    ...(width !== undefined && { width: width as DimensionValue }),
    ...(height !== undefined && { height }),
  };

  return (
    <Shimmer {...shimmerProps}>
      <View
        className={cn("rounded-md bg-foreground/10", className)}
        style={dynamicStyle}
      />
    </Shimmer>
  );
}
