import { useEffect, useState } from 'react';
import { View, Animated } from 'react-native';

import styles from './styles';

const BlinkingAnimation = props => {
  const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0.3));
  const { duration, repeat_count } = props;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnimation, {
          toValue: 0.5,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: repeat_count,
      }
    ).start();
  });

  return (
    <View>
      <Animated.View style={[{ opacity: fadeAnimation }, { ...props.style }]}>
        {props.children}
      </Animated.View>
    </View>
  );
};

export default BlinkingAnimation;
