import React from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";
import { useAnimatedStar } from "../hooks/useAnimatedStar";
import { Pokemon } from "./Pokedex";
import SvgStar from "./SvgStar";

const AnimatedSvg = Animated.createAnimatedComponent(SvgStar);

const AnimatedStar = (props: { pokemon: Pokemon }) => {
  const { handlePress, rotateStar, sizeStar, changeColor } =
    useAnimatedStar(props);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View style={{ transform: [{ rotate: rotateStar }] }}>
        <AnimatedSvg width={sizeStar} color={changeColor}></AnimatedSvg>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default AnimatedStar;
