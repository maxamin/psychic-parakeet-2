import * as React from 'react';
import {
    Container,
    Avatar,
    Heading,
    Text,
    VStack,
    Stack,
    Link,
    IconButton,
    Divider,
    Flex,
    Box,
    Center
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { FaGithub, FaDev, FaLinkedin, FaQuora, FaTwitter } from 'react-icons/fa';
import {GiUnicorn, GiShiningHeart, GiTripleYin, GiTentacleHeart, GiSpinalCoil} from "react-icons/gi";

const iconProps = {
    variant: 'ghost',
    size: 'lg',
    isRound: true
};

const InfoSection = (props) => {
    const performer = props.performer;
    return (
        <Container maxW="7xl" p={{ base: 5, md: 10 }} mx="auto">
            <Center>
                <VStack spacing={4} px={2} alignItems={{ base: 'center', sm: 'flex-start' }}>
                    <Stack justifyContent="center" alignItems="center">
                        <Avatar
                            boxShadow="xl"
                            size="xl"
                            src={props.imageSrc}
                        />
                        <Text fontSize="sm">{performer.name}</Text>
                    </Stack>
                    <Heading
                        textAlign={{ base: 'center', sm: 'left' }}
                        margin="0 auto"
                        width={{ base: '23rem', sm: 'auto' }}
                        fontSize={{ base: '2.5rem', sm: '3rem' }}
                    >
                        {props.heading}
                    </Heading>
                    <Text>
                        {performer.name} invites you to indulge in her artistry.
                        Check availability and book your exclusive show.</Text>
                    <Divider/>
                    <Text textAlign="center">{performer.description}</Text>
                    <Divider />
                    <Flex alignItems="center" justifyContent="center" w="100%">
                        <Box textAlign="center">
                            {accounts.map((sc, index) => (
                                <IconButton
                                    key={index}
                                    as={Link}
                                    isExternal
                                    href={sc.url}
                                    aria-label={sc.label}
                                    colorScheme={sc.type}
                                    rounded="full"
                                    icon={sc.icon}
                                    {...iconProps}
                                />
                            ))}
                        </Box>
                    </Flex>
                </VStack>
            </Center>
        </Container>
    );
};

const accounts = [
    {
        url: '#',
        label: '1',
        type: 'red',
        icon: <GiShiningHeart />
    },
    {
        url: '#',
        label: '2',
        type: 'yellow',
        icon: <GiSpinalCoil />
    },
    {
        url: '#',
        label: '3',
        type: 'red',
        icon: <GiTentacleHeart />
    },
    {
        url: '#',
        label: '4',
        type: 'green',
        icon: <GiTripleYin/>
    },
    {
        url: '#',
        label: '5',
        type: 'pink',
        icon: <GiUnicorn/>
    }
];

export default InfoSection;