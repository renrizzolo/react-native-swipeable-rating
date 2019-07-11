import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, PanResponder } from 'react-native';
import Star from './components/Star';

class SwipeableRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (ev, gesture) => true,
      onStartShouldSetPanResponderCapture: (ev, gesture) => true,
      onMoveShouldSetPanResponder: (ev, gesture) => true,
      onMoveShouldSetPanResponderCapture: (ev, gesture) => true,
      onPanResponderTerminationRequest: (ev, gesture) => true,
      onPanResponderMove: (ev, gesture) => {
        this.setState({ value: ev.nativeEvent.pageX });
        const x = gesture.dx;
        console.log(ev.nativeEvent);

        // console.log(x, this.state.value);

        const rating = this.getCurrentRating(ev.nativeEvent.pageX - this.props.xOffset);
        if (rating >= this.props.minRating && rating <= this.props.maxRating) {
          this.setCurrentRating(rating);
        }
      },
      onPanResponderRelease: (ev, gesture) => {
        const tapThreshold = this.props.size / 2;
        const x = gesture.dx;
        if (!(x < 0 - tapThreshold) && !(x > 0 + tapThreshold)) {
          this.direction = 'tap';
        }
        console.log(x, ev.nativeEvent.pageX);

        const rating = this.getCurrentRating(ev.nativeEvent.pageX - this.props.xOffset);
        if (
          this.direction === 'tap' &&
          rating >= this.props.minRating &&
          rating <= this.props.maxRating
        ) {
          this.setCurrentRating(rating);
        }
      },
    });
  }

  getCurrentRating(value) {
    const { allowHalves, gap, size } = this.props;
    const starWidth = size + gap;
    let currentRating = value / starWidth;
    currentRating = !allowHalves ? Math.ceil(currentRating) : Math.ceil(currentRating * 2) / 2;
    return currentRating;
  }

  setCurrentRating(rating) {
    const { gap, size } = this.props;
    const starWidth = size + gap;
    const value = rating * starWidth;
    this.setState({ value });
    console.log('setCurrentRating', value, rating);
    this.onPress(rating);
  }

  onPress = n => {
    console.log('onPress', n);

    this.props.onPress && this.props.onPress(n);
  };

  renderContainer = ({ children }) => {
    const { swipeable, style } = this.props;
    return swipeable ? (
      <View
        {...this._panResponder.panHandlers}
        style={{
          ...styles.container,
          ...style,
        }}
      >
        {children}
      </View>
    ) : (
      <View
        style={{
          ...styles.container,
          ...style,
        }}
      >
        {children}
      </View>
    );
  };
  render() {
    const { rating, maxRating, allowHalves, ...rest } = this.props;

    hasOnPress = Boolean(this.props.onPress);
    return (
      <this.renderContainer>
        {Array(maxRating)
          .fill()
          .map((_, n) => (
            <Star
              key={n}
              n={n + 1}
              onPress={this.onPress}
              hasOnPress={hasOnPress}
              filled={rating > n}
              half={allowHalves && rating > n && rating < n + 1}
              {...rest}
            />
          ))}
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
  },
});

SwipeableRating.propTypes = {
  rating: PropTypes.number.isRequired,
  style: PropTypes.object,
  color: PropTypes.string,
  emptyColor: PropTypes.string,
  size: PropTypes.number,
  gap: PropTypes.number,
  xOffset: PropTypes.number,
  allowHalves: PropTypes.bool,
  onPress: PropTypes.func,
  minRating: PropTypes.number,
  maxRating: PropTypes.number,
  filledIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  halfFilledIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  emptyIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

SwipeableRating.defaultProps = {
  swipeable: true,
  color: 'crimson',
  emptyColor: 'crimson',
  size: 24,
  gap: 0,
  xOffset: 0,
  minRating: 1,
  maxRating: 5,
  allowHalves: false,
  filledIcon: 'star',
  halfFilledIcon: 'star-half',
  emptyIcon: 'star-border',
};

export default SwipeableRating;
