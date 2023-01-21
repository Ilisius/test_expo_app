import React, { useEffect, useState } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/favoriteReducer';
import { Pokemon } from './Pokedex';

const starPath = "M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z";
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedStar = (props : {pokemon : Pokemon}) => {

    const favoritesPokemons = useSelector((state : {favorite : Array<Pokemon>}) => state.favorite);
    const animValue : number = favoritesPokemons.some(pkmn => pkmn.name === props.pokemon.name) ? 1 : 0;
    const [rotationAnim, setRotationAnim] = useState(new Animated.Value(animValue));
    const [starColorAnim, setStarColorAnim] = useState(new Animated.Value(animValue));
    const [sizeAnim, setSizeAnim] = useState(new Animated.Value(animValue));
    const dispatch = useDispatch();

    useEffect( () => {
        const b : number = favoritesPokemons.some(pkmn => pkmn.name === props.pokemon.name) ? 1 : 0;
        setRotationAnim(new Animated.Value(b));
        setStarColorAnim(new Animated.Value(b));
        setSizeAnim(new Animated.Value(b));
    }, [animValue]);

    const handlePress = () => {
        const isFavorite = favoritesPokemons.some(pkmn => pkmn.name === props.pokemon.name);

        const anim = Animated.parallel([
            Animated.timing(rotationAnim, {
                toValue: !isFavorite ? 1 :  0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(starColorAnim, {
                toValue: !isFavorite ? 1 :  0,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(sizeAnim, {
                toValue: !isFavorite ? 1 :  0,
                duration: 500,
                useNativeDriver: false,
            })
        ]).start(() => {
            isFavorite ? dispatch(removeFavorite(props.pokemon)) : dispatch(addFavorite(props.pokemon));
        });
    };

    const rotateStar = rotationAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "720deg"],
    });

    const changeColor = starColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["#C0C0C0", "#FFD700"],
    });

    const sizeStar = sizeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [40, 45],
    });

    return(
        <TouchableWithoutFeedback onPress={handlePress} >
            <Animated.View style={{transform: [{rotate: rotateStar}] }}>
                <AnimatedSvg height={sizeStar} width={sizeStar} viewBox='-5 -5 55 55'>
                    <AnimatedPath d={starPath} fill={changeColor} stroke={changeColor} strokeWidth={2}/>
                </AnimatedSvg>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

export default AnimatedStar
