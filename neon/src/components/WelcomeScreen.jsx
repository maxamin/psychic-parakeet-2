import React from 'react';
import { Heading, Text, Button } from '@chakra-ui/react';
import HeroSection from "../blocks/SimpleHero";


//titleText, leadText, buttonText, flashMessage=null

const welcome_key = "welcomed";
const defaultFlash = "Welcome to NeonTempest!";
const altFlash = "Welcome back!"


function getDefaultFlash(){
    if (!localStorage.getItem(welcome_key)) {
        localStorage.setItem(welcome_key, welcome_key)
        return defaultFlash
    }
    return altFlash;
}
const WelcomeScreen = () => {
    const title = "A Hub for sex workers that's private and secure.";
    const title2 = "Do you do sex work? Or does your sex work?";

    const lead = "Welcome to NeonTempest, where the allure of darkness meets the electric embrace of neon. Ignite your senses and indulge in unforgettable private performances. Unleash the tempest within.";
    const btn = "Get Started";
    const fM = getDefaultFlash();
    return (
        <HeroSection titleText={title2} leadText={lead} buttonText={btn} flashMessage={fM}></HeroSection>

    );
};

export default WelcomeScreen;