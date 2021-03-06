import React from 'react';
import { TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';


const Star = ({
  hasOnPress,
  filled,
  size,
  half,
  onPress,
  gap,
  n,
  color,
  emptyColor,
  filledIcon,
  halfFilledIcon,
  emptyIcon, }) => (
    <TouchableOpacity
      disabled={!hasOnPress}
      onPress={() => onPress(n)}
    >
      {typeof filledIcon === 'string' ?
        <Icon
          style={{
            color: filled ? color : emptyColor,
            marginRight: gap
          }}
          name={filled ? (half ? halfFilledIcon : filledIcon) : emptyIcon}
          size={size}
        />
        :
        filled ? 
        (half ? 
          halfFilledIcon(size, gap, color, emptyColor, n) :
          filledIcon(size, gap, color, emptyColor, n)
        )
        : emptyIcon(size, gap, color, emptyColor, n)
      }
    </TouchableOpacity>
);

Star.propTypes = {
  hasOnPress: PropTypes.bool,
  filled: PropTypes.bool,
  size: PropTypes.number,
  half: PropTypes.bool,
  onPress: PropTypes.func,
  gap: PropTypes.number,
  n: PropTypes.number.isRequired,
  color: PropTypes.string,
  emptyColor: PropTypes.string,
  filledIcon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  halfFilledIcon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  emptyIcon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
};

export default Star;
