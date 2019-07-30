import * as React from 'react';
import { ViewPropTypes } from 'react-native';

export interface SwipeableRatingProps {
  rating: number;
  onPress?( rating: number ): void;
  swipeable?: boolean;
  xOffset?: number;
  style?: ViewPropTypes.style;
  color?: string;
  emptyColor?: string;
  size?: number;
  gap?: number;
  minRating?: number;
  maxRating?: number;
  allowHalves?: boolean;
  filledIcon?: string | (() => void);
  halfFilledIcon?: string | (() => void);
  emptyIcon?: string | (() => void);
}

export class SwipeableRating extends React.Component<SwipeableRatingProps> {}