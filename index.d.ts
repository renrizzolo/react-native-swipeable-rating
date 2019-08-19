declare module 'react-native-swipeable-rating' {
  import { ReactElement } from 'react';
  import { ViewStyle, StyleProp } from 'react-native';

  export interface SwipableRatingProps {
    rating: number;
    onPress?(rating: number): void;
    swipeable?: boolean;
    xOffset?: number;
    style?: StyleProp<ViewStyle>;
    color?: string;
    emptyColor?: string;
    size?: number;
    gap?: number;
    minRating?: number;
    maxRating?: number;
    allowHalves?: boolean;
    filledIcon?: string | ((size: number, gap: number) => ReactElement);
    halfFilledIcon?: string | ((size: number, gap: number) => ReactElement);
    emptyIcon?: string | ((size: number, gap: number) => ReactElement);
  }
  
  export default class SwipableRating extends React.Component<SwipableRatingProps>{}
}
