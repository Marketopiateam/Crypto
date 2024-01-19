import React, { useCallback, useState } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet, BackHandler } from "react-native";
import HomeScreen from "../screens/home/homeScreen";
import StatisticScreen from "../screens/statistic/statisticScreen";
import PortfolioScreen from "../screens/portfolio/portfolioScreen";
import UserScreen from "../screens/user/userScreen";
import { Sizes, Colors, Fonts } from "../constants/styles";
import { useFocusEffect } from '@react-navigation/native';

const BottomTabBarScreen = ({ navigation }) => {

    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        updateState({ backClickCount: 1 });
        setTimeout(() => {
            updateState({ backClickCount: 0 })
        }, 1000)
    }

    const [state, setState] = useState({
        backClickCount: 0,
        currentIndex: 1,
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { backClickCount, currentIndex } = state;

    const changeIndex = ({ index }) => {
        updateState({ currentIndex: index })
    }

    return (
        <View style={{ flex: 1 }}>
            {currentIndex == 1 ?
                <HomeScreen navigation={navigation} changeIndex={changeIndex} />
                :
                currentIndex == 2 ?
                    <StatisticScreen navigation={navigation} />
                    :
                    currentIndex == 3 ?
                        <PortfolioScreen navigation={navigation} />
                        :
                        <UserScreen navigation={navigation} />
            }
            <View style={styles.bottomTabBarStyle}>
                {bottomTabBarItem({
                    index: 1,
                    icon: require('../assets/images/icon/home.png'),
                })}
                {bottomTabBarItem({
                    index: 2,
                    icon: require('../assets/images/icon/statistic.png'),
                })}
                {bottomTabBarItem({
                    index: 3,
                    icon: require('../assets/images/icon/portfolio.png'),
                })}
                {bottomTabBarItem({
                    index: 4,
                    icon: require('../assets/images/icon/user.png'),
                })}
            </View>
            {exitInfo()}
        </View>
    )

    function exitInfo() {
        return (
            backClickCount == 1
                ?
                <View style={styles.exitWrapStyle}>
                    <Text style={{ ...Fonts.white13Medium }}>
                        Press Back Once Again to Exit
                    </Text>
                </View>
                :
                null
        )
    }

    function bottomTabBarItem({ index, icon }) {
        return (
            <TouchableOpacity
                activeOpacity={0.99}
                onPress={() => changeIndex({ index: index })}
            >
                <Image
                    source={icon}
                    resizeMode="contain"
                    style={{ height: 25.0, width: 25.0, tintColor: currentIndex == index ? Colors.primaryColor : '#D1D1D1' }}
                />
            </TouchableOpacity>
        )
    }
}

export default BottomTabBarScreen;

const styles = StyleSheet.create({
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 65.0,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30.0,
        elevation: 2.0,
    },
    exitWrapStyle: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 50,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
})