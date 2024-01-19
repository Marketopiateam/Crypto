import React from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { Feather } from '@expo/vector-icons';

const RegisterScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                {backArrow()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding, flexGrow: 1, justifyContent: 'center' }}
                >
                    {logo()}
                    {registerText()}
                    {userNameTextField()}
                    {emailTextField()}
                    {passwordTextField()}
                    {confirmPasswordTextField()}
                    {continueButton()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function backArrow() {
        return (
            <Feather
                name="arrow-left"
                size={25}
                color={Colors.blackColor}
                style={{ marginHorizontal: Sizes.fixPadding + 5.0, marginVertical: Sizes.fixPadding * 2.0, }}
                onPress={() => navigation.pop()}
            />
        )
    }

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.push('OTP')}
                style={styles.continueButtonStyle}
            >
                <Text style={{ ...Fonts.white16SemiBold }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    function confirmPasswordTextField() {
        return (
            <View style={styles.textFieldContainerStyle}>
                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor={Colors.blackColor}
                    style={{ ...Fonts.black16Medium }}
                    secureTextEntry={true}
                    cursorColor={Colors.primaryColor}
                />
            </View>
        )
    }

    function passwordTextField() {
        return (
            <View style={styles.textFieldContainerStyle}>
                <TextInput
                    placeholder="Password"
                    placeholderTextColor={Colors.blackColor}
                    style={{ ...Fonts.black16Medium }}
                    secureTextEntry={true}
                    cursorColor={Colors.primaryColor}
                />
            </View>
        )
    }

    function emailTextField() {
        return (
            <View style={styles.textFieldContainerStyle}>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={Colors.blackColor}
                    style={{ ...Fonts.black16Medium }}
                    keyboardType="email-address"
                    cursorColor={Colors.primaryColor}
                />
            </View>
        )
    }

    function userNameTextField() {
        return (
            <View style={styles.textFieldContainerStyle}>
                <TextInput
                    placeholder="Username"
                    placeholderTextColor={Colors.blackColor}
                    style={{ ...Fonts.black16Medium }}
                    cursorColor={Colors.primaryColor}
                />
            </View>
        )
    }

    function registerText() {
        return (
            <Text style={{ ...Fonts.gray16Bold, alignSelf: 'center', marginTop: Sizes.fixPadding + 5.0 }}>
                Register your account
            </Text>
        )
    }

    function logo() {
        return (
            <Image source={require('../../assets/images/auth-icon.png')}
                style={{ alignSelf: 'center', width: 150.0, height: 150.0, marginBottom: Sizes.fixPadding }}
                resizeMode="contain"
            />
        )
    }
}

const styles = StyleSheet.create({
    textFieldContainerStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        paddingVertical: Sizes.fixPadding + 3.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        borderRadius: Sizes.fixPadding,
        elevation: 1.0,
        marginTop: Sizes.fixPadding * 2.0
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 7.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.0
    },
})

export default RegisterScreen;