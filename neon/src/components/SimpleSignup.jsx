import { useState } from 'react';
import {
    Container,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    VStack,
    Center,
    InputGroup,
    InputRightElement,
    Checkbox,
    Link
} from '@chakra-ui/react';

const SimpleSignup = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
        <Container maxW="7xl" p={{ base: 5, md: 10 }}>
            <Center>
                <Stack spacing={4}>

                    <VStack
                        as="form"
                        boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
                        h="max-content !important"
                        bg={useColorModeValue('white', 'gray.700')}
                        rounded="lg"
                        boxShadow="lg"
                        p={{ base: 5, sm: 10 }}
                        spacing={8}
                    >
                        <VStack spacing={4} w="100%">
                            <FormControl id="username">
                                <FormLabel>Username</FormLabel>
                                <Input rounded="md" type="text" />
                            </FormControl>
                        </VStack>

                    </VStack>
                </Stack>
            </Center>
        </Container>
    );
};

export default SimpleSignup;