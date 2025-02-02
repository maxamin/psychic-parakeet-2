import {
    Box, Button, Flex, chakra, HStack, Badge, Image, Link as ChakraLink
} from '@chakra-ui/react';
import {StarIcon} from "@chakra-ui/icons";
import {Link as RouterLink} from "react-router-dom";

const PerformerRating = ({rate_num}) => {
    const out_of = 5;
    let rates = [1, 1, 1, 1, 1];
    rates.fill(300, 0, rate_num);
    if (rate_num < 5) {
        rates.fill(500, rate_num, 5)
    }
    return rates
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandoImage() {
    return `/profiles/${randomIntFromInterval(1, 21)}.jpg`
}

const PerformerCard2 = ({performer}) => {
    performer.rating = randomIntFromInterval(1, 5);
    performer.imageSrc = getRandoImage();

    performer.price = randomIntFromInterval(140, 270) + randomIntFromInterval(50, 331)

    return (

        <Flex
            maxW="lg"
            minW={400}
            w={400}
            mx="auto"
            mt="3"
            // _dark={{
            //     bg: "gray.800",
            // }}
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            boxShadow='dark-lg'
        >
            {/*<Box*/}
            {/*    w={1 / 3}*/}
            {/*    bgSize="cover"*/}
            {/*    style={{*/}
            {/*        backgroundImage:`url('${performer.imageSrc}')`,*/}
            {/*        backgroundSize:'contain',*/}
            {/*        backgroundRepeat:'no-repeat'*/}
            {/*    }}*/}

            {/*></Box>*/}

            <Box w={"50%"} p={2} display={"flex"} justifyContent={"center"} style={{overflow: "hidden"}}
                // style={{backgroundImage:`url('${performer.imageSrc}')`,
                //        objectFit:'fill',
                //         backgroundRepeat:'no-repeat', backgroundPosition:"center"}}
            >
                <Image
                    objectFit='fill'
                    minW={"100%"}
                    minH={"100%"}
                    style={{flexShrink: "0"}}
                    src={performer.imageSrc}
                    alt='image' mx={2} rounded={1}
                />
            </Box>

            <Box
                w={"50%"}
                p={{
                    base: 1,
                    md: 2,
                }}
            >
                <chakra.h1
                    fontSize="2xl"
                    fontWeight="bold"
                    color="gray.800"
                    _dark={{
                        color: "white",
                    }}
                >
                    {performer.name}
                </chakra.h1>

                <Box
                    color='gray.500'
                    fontWeight='semibold'
                    letterSpacing='wide'
                    fontSize='xs'
                    textTransform='uppercase'
                    ml='2'
                >
                    Dominatrix | Escort
                </Box>

                <Badge borderRadius='full' px='2' colorScheme='red'>
                    New
                </Badge>

                <chakra.p
                    mt={2}
                    fontSize="sm"
                    color="gray.600"
                    _dark={{
                        color: "gray.400",
                    }}
                >
                    {performer.description.substring(0, 60)}
                </chakra.p>

                <Box display='flex' mt='2' alignItems='center'>
                    {Array(5)
                        .fill('')
                        .map((_, i) => (
                            <StarIcon
                                key={i}
                                color={i < performer.rating ? 'pink.500' : 'gray.300'}
                            />
                        ))}
                    <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                        {randomIntFromInterval(3, 50)} reviews
                    </Box>
                </Box>

                <Flex mt={3} alignItems="center" justifyContent="space-between">
                    <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
                        ${performer.price}
                    </chakra.h1>
                    <ChakraLink as={RouterLink} to={`/profile/${performer.id}`}>
                        <chakra.button
                            px={2}
                            py={1}
                            bg="white"
                            fontSize="xs"
                            color="gray.900"
                            fontWeight="bold"
                            rounded="lg"
                            textTransform="uppercase"
                            _hover={{
                                bg: "gray.200",
                            }}
                            _focus={{
                                bg: "gray.400",
                            }}
                        >
                            View
                        </chakra.button>
                    </ChakraLink>
                </Flex>
            </Box>
        </Flex>


    );
};

export default PerformerCard2
