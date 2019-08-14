import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import SwipeableRating, { styles } from '../lib/swipeable-rating';
import Star from '../lib/components/Star';

const filledIcon = (size, gap, color ) =>
  <View style={{ width: size, marginRight: gap, backgroundColor: color }}>
    <Text>
      *
    </Text>
  </View>;

const emptyIcon = ( size, gap, _, emptyColor ) =>
  <View style={{ width: size, marginRight: gap, backgroundColor: emptyColor }}>
    <Text>
      _
    </Text>
  </View>;

describe('SwipeableRating Snapshot tests', () => {
  it('renders a 5 SwipeableRating using Snapshots', () => {
    expect(renderer.create(
      <SwipeableRating rating={5} />
    )).toMatchSnapshot();
  });

  it('renders a 3.5 star SwipeableRating using Snapshots', () => {
    expect(renderer.create(
      <SwipeableRating allowHalves rating={3.5} />
    )).toMatchSnapshot();
  });
});
describe('SwipeableRating shallow with Enzyme', () => {
  const wrapper = shallow(
    <SwipeableRating
      swipeable={false}
      rating={4}
      onPress={jest.fn()}
    />
  );

  it('renders the correct filled/unfilled stars', () => {
    expect(
      wrapper.containsAllMatchingElements([
        <Star n={1} hasOnPress={true} filled={true} half={false} />,
        <Star n={2} hasOnPress={true} filled={true} half={false} />,
        <Star n={3} hasOnPress={true} filled={true} half={false} />,
        <Star n={4} hasOnPress={true} filled={true} half={false} />,
        <Star n={5} hasOnPress={true} filled={false} half={false} />
      ])).toBe(true);
  });

});

describe('SwipeableRating mounted with Enzyme', () => {
  
  const wrapper = mount(
    <SwipeableRating
      swipeable={false}
      rating={4}
      filledIcon={filledIcon}
      emptyIcon={emptyIcon}
      color="blue"
      emptyColor="red"
    />
  );
  
  it('renders custom icon component functions and passes in color props', () => {
  expect(
    wrapper.containsAllMatchingElements(
      [filledIcon(24, 0, 'blue'), emptyIcon(24, 0, '', 'red')]
    )).toBe(true);
  });
});