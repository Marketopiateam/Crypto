import React, { useCallback } from "react";
import { Text, View, SafeAreaView, StatusBar, BackHandler } from "react-native";
import { Colors, Fonts } from "../constants/styles";
import { CircleFade } from 'react-native-animated-spinkit';
import { useFocusEffect } from "@react-navigation/native";

const SplashScreen = ({ navigation }) => {

    const backAction = () => {
        BackHandler.exitApp();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );


    setTimeout(() => {
        navigation.navigate('SignIn');
    }, 2000);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ ...Fonts.white40Bold }}>
                    CryptoX
                </Text>
                <CircleFade size={70} color={Colors.whiteColor}
                    style={{ position: 'absolute', bottom: 50.0 }}
                />
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen;