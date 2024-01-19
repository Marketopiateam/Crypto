import React, { useState } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, } from "react-native";
import { Fonts, Colors, Sizes } from "../../constants/styles";
import { Feather } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { CircleFade } from 'react-native-animated-spinkit';
import OTPTextView from 'react-native-otp-textinput';

const { width } = Dimensions.get('screen');

const OTPScreen = ({ navigation }) => {

    const [otpInput, setotpInput] = useState('');
    const [isLoading, setisLoading] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar translucent={false} backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Feather
                    name="arrow-left"
                    size={25}
                    color="black"
                    style={{ position: 'absolute', left: 15.0, top: 20.0, zIndex: 1, }}
                    onPress={() => navigation.pop()}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding, flexGrow: 1, justifyContent: 'center' }}
                >
                    {logo()}
                    {otpText()}
                    {otpFields()}
                    {resendInfo()}
                    {continueButton()}
                </ScrollView>
            </View>
            {loading()}
        </SafeAreaView>
    )

    function loading() {
        return (
            <Dialog.Container
                visible={isLoading}
                contentStyle={styles.dialogContainerStyle}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', }}>
                    <CircleFade size={48} color={Colors.primaryColor} />
                    <Text style={{ ...Fonts.gray15Medium, paddingBottom: Sizes.fixPadding - 5.0, marginTop: Sizes.fixPadding * 2.0 }}>
                        Please Wait...
                    </Text>
                </View>
            </Dialog.Container>
        );
    }

    function continueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    setisLoading(true)
                    setTimeout(() => {
                        setisLoading(false)
                        navigation.push('SecurePin');
                    }, 2000);
                }}
                style={styles.continueButtonStyle}>
                <Text style={{ ...Fonts.white16SemiBold }}>Continue</Text>
            </TouchableOpacity>
        )
    }

    function otpFields() {
        return (
            <OTPTextView
                containerStyle={{ marginTop: Sizes.fixPadding * 7.0, marginHorizontal: Sizes.fixPadding * 2.0 }}
                handleTextChange={(text) => {
                    setotpInput(text)
                    if (otpInput.length == 3) {
                        setisLoading(true)
                        setTimeout(() => {
                            setisLoading(false)
                            navigation.push('SecurePin');
                        }, 2000);
                    }
                }}
                inputCount={4}
                keyboardType="numeric"
                tintColor={Colors.primaryColor}
                offTintColor={Colors.whiteColor}
                textInputStyle={{ ...styles.textFieldStyle }}
            />
        )
    }

    function resendInfo() {
        return (
            <View style={styles.resendInfoContainerStyle}>
                <Text style={{ ...Fonts.gray15Medium }}>
                    Did'nt receive OTP Code!
                </Text>
                <Text style={{ ...Fonts.black19Bold, marginLeft: Sizes.fixPadding }}>
                    Resend
                </Text>
            </View>
        )
    }

    function otpText() {
        return (
            <Text style={{
                ...Fonts.gray16Bold, alignSelf: 'center',
                ...styles.otpTextContainerStyle,
            }}>
                Enter the otp code from the phone we just sent you
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
        height: 55.0,
        width: 55.0,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1.0
    },
    resendInfoContainerStyle: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 4.0,
    },
    otpTextContainerStyle: {
        textAlign: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding + 5.0
    },
    continueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 7.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding,
        marginTop: Sizes.fixPadding * 2.5
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0,
    },
    textFieldStyle: {
        borderBottomWidth: null,
        borderRadius: Sizes.fixPadding - 2.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        ...Fonts.black17SemiBold,
    },
})

export default OTPScreen;