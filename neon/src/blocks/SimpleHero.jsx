import * as React from 'react';
import { Container, chakra, Stack, Text, Button, Box } from '@chakra-ui/react';
import {Link as RouteLink} from 'react-router-dom';

// Here we have used react-icons package for the icons
import { FaGithub } from 'react-icons/fa';
function getFlashMessage(hasMessage, theMessage){
    if (! hasMessage){return null;}
    return  <Box py={2} px={3} bg="teal" w="max-content" color="white" rounded="md" fontSize="sm">
        <Stack direction={{ base: 'column', sm: 'row' }}>
            <Text fontWeight="bold">Ready, Set, Build! 🚀</Text>
            <Text>{theMessage}</Text>
        </Stack>
    </Box>
}
const HeroSection = (props) => {
    const renderFlashMessage = (props.flashMessage == null);
    let titleText = props.titleText.split(" ");
    const lastTwoWords = titleText.splice(-3).join(" ");
    titleText = titleText.join(" ") + " ";

    return (
        <Container p={{ base: 8, sm: 14 }}>
            <Stack direction="column" spacing={6} alignItems="center">
                {getFlashMessage(renderFlashMessage, props.flashMessage)}
                <chakra.h1
                    fontSize={{ base: '4xl', sm: '5xl' }}
                    fontWeight="bold"
                    textAlign="center"
                    maxW="600px"
                    lineHeight={"125%"}
                >
                    {titleText}
                    <chakra.span color="teal" bg="linear-gradient(transparent 50%, #83e9e7 50%)">
                        {lastTwoWords}
                    </chakra.span>
                </chakra.h1>
                <Text maxW="550px" fontSize="xl" textAlign="center" color="gray.500">
                    {props.leadText}
                </Text>
                <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    w={{ base: '100%', sm: 'auto' }}
                    spacing={5}
                >

                    <RouteLink to="start">
                    <Button
                        colorScheme="teal"
                        variant="outline"
                        rounded="md"
                        size="lg"
                        height="3.5rem"
                        fontSize="1.2rem"

                    >
                        {props.buttonText}
                    </Button>
                    </RouteLink>
                    {/*<Button*/}
                    {/*    leftIcon={<FaGithub />}*/}
                    {/*    colorScheme="gray"*/}
                    {/*    variant="outline"*/}
                    {/*    rounded="md"*/}
                    {/*    size="lg"*/}
                    {/*    height="3.5rem"*/}
                    {/*    fontSize="1.2rem"*/}
                    {/*>*/}
                    {/*    Github*/}
                    {/*</Button>*/}
                </Stack>
            </Stack>
        </Container>
    );
};

export default HeroSection;