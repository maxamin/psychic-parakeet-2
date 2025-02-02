import {Box, Center, Flex, Square, Text, VStack, HStack} from "@chakra-ui/react";

export const PayMe = () => {
    return (
        <>

            <Box bg="tomato" w="100%" p={4} color="white">
                This is the Box

                <VStack direction={"column"}>
                    <Square bg="blue.500" size="150px">
                        <Text>Box 2</Text>
                    </Square>
                    <Square bg="blue.500" size="150px">
                        <Text>Box 2</Text>
                    </Square>

                </VStack>
            </Box>

        </>
    )
}