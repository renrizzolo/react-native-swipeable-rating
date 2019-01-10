import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  PanResponder,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';


class SwipeableRating extends Component {

  constructor(props) {
    super(props);


    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (ev, gesture) => true,
      onStartShouldSetPanResponderCapture: (ev, gesture) => true,
      onMoveShouldSetPanResponder: (ev, gesture) => true,
      onMoveShouldSetPanResponderCapture: (ev, gesture) => true,
      onPanResponderTerminationRequest: (ev, gesture) => true,
      onPanResponderMove: (ev, gesture) => {
        this.setState({ value: ev.nativeEvent.pageX });
        const tapThreshold = 10;
        const x = gesture.dx;
        const rating = this.getCurrentRating(ev.nativeEvent.pageX - this.props.size);
        if (rating >= this.props.minRating && rating <= this.props.maxRating) {
          this.setCurrentRating(rating);
        }
      },
      onPanResponderRelease: (ev, gesture) => {
        const tapThreshold = this.props.size;
        const x = gesture.dx;
        if (!(x < 0 - tapThreshold) && !(x > 0 + tapThreshold)) {
          this.direction = 'tap';
        }
        const rating = this.getCurrentRating(ev.nativeEvent.pageX - this.props.size);
        if (this.direction === 'tap' && rating >= this.props.minRating && rating <= this.props.maxRating) {
          this.setCurrentRating(rating);
        }
      },
    });
  }

  getCurrentRating(value) {
    const {
      allowHalves,
      gap,
      size,
    } = this.props;
    const starWidth = size + gap;
    let currentRating = (value / starWidth);
    currentRating = !allowHalves ? Math.ceil(currentRating) : Math.ceil(currentRating * 2) / 2;
    return currentRating;
  }

  setCurrentRating(rating) {
    const {
      gap,
      size
    } = this.props;
    const starWidth = size + gap;
    const value = rating * starWidth;
    this.setState({ value });
    console.log('setCurrentRating', value, rating);
    this.onPress(rating);
  }

  onPress = (n) => {
    console.log('onPress', n);

    this.props.onPress &&
      this.props.onPress(n);

  }

  renderContainer = ({ children }) => {
    const { swipeable, size, style } = this.props;
    return (
      swipeable ?
        <View
          {...this._panResponder.panHandlers}
          style={{
            ...styles.container,
            ...style,
          }}>
          {children}
        </View>
        :
        <View
          style={{
            ...styles.container,
            ...style,
          }}>
          {children}
        </View>
    )
  }
  render() {
    const {
      rating,
      style,
      size,
      maxRating,
      gap,
      color,
      emptyColor,
      allowHalves,
    } = this.props;

    hasOnPress = Boolean(this.props.onPress);
    return (
      <this.renderContainer>
        {
          Array.from(Array(maxRating).keys()).map(n => (
            <Star
              n={n + 1}
              onPress={this.onPress}
              hasOnPress={hasOnPress}
              filled={rating > n}
              half={allowHalves && rating > n && rating < n + 1}
              size={size}
              gap={gap}
              color={color}
              emptyColor={emptyColor}
            />
          ))
        }
      </this.renderContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
})

const Star = ({
  hasOnPress,
  filled,
  size,
  half,
  onPress,
  gap,
  n,
  color,
  emptyColor }) => {
  return (
    <TouchableOpacity
      disabled={!hasOnPress}
      onPress={() => onPress(n)}
    >
      <Icon
        style={{
          color: filled ? color : emptyColor,
          marginRight: gap
        }}
        name={filled ? (half ? 'star-half' : 'star') : 'star-border'}
        size={size}
      />
    </TouchableOpacity>
  );
}

SwipeableRating.propTypes = {
  rating: PropTypes.arrayOf(PropTypes.string).isRequired,
  style: PropTypes.object,
  color: PropTypes.string,
  emptyColor: PropTypes.string,
  size: PropTypes.number,
  gap: PropTypes.number,
  allowHalves: PropTypes.bool,
  onPress: PropTypes.func,
  minRating: PropTypes.number,
  maxRating: PropTypes.number,
  filledIcon: PropTypes.string,
  halfFilledIcon: PropTypes.string,
  emptyIcon: PropTypes.string,
}

SwipeableRating.defaultProps = {
  swipeable: true,
  color: 'crimson',
  emptyColor: 'crimson',
  size: 24,
  gap: 4,
  minRating: 0.5,
  maxRating: 5,
  allowHalves: false,
  filledIcon: 'star',
  halfFilledIcon: 'star-half',
  emptyIcon: 'star-border',
}

export default SwipeableRating;