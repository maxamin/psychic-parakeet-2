// src/components/AuthScreen.js
import React from 'react';
import { Heading, Text, Button } from '@chakra-ui/react';

const AuthScreen = () => {
    return (
        <div>
            <Heading as="h2" mb="4">
                Welcome back! Log in to your NeonTempest account for a night of enchantment.
            </Heading>
            <Text mb="8">New here? Join the tempest and start your journey.</Text>
            <Text>Become part of an exclusive community that appreciates the art of temptation. Sign up now to receive updates, special offers, and access to members-only events.</Text>
            <Button colorScheme="teal">Log In</Button>
            <Button ml="4" colorScheme="teal" variant="outline">
                Sign Up
            </Button>
        </div>
    );
};

export default AuthScreen;

// Continue with similar implementations for other components...
