import React, { useState } from 'react';
import {
  Box,
  Button,
  Circle,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FaBitcoin, FaEthereum, FaUser } from 'react-icons/fa';

const Index = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');

  return (
    <Flex
      direction="column"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      m={5}
    >
      <Circle size="100px" bg="gray.100" mx="auto">
        <Image
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyfGVufDB8fHx8MTcwMzgwNzc2OHww&ixlib=rb-4.0.3&q=80&w=1080"
          alt="user avatar"
          borderRadius="full"
          boxSize="100%"
        />
      </Circle>
      <Heading as="h3" size="lg" textAlign="center" mt={5}>
        John Doe
      </Heading>
      <Text fontSize="md" p={3} textAlign="center">
        Professional Consultant - $200/hr
      </Text>
      <FormControl as="fieldset" mt={5}>
        <FormLabel as="legend">Select crypto:</FormLabel>
        <RadioGroup onChange={setSelectedCrypto} value={selectedCrypto}>
          <Stack direction="row" justify="center">
            <Radio value="bitcoin">
              <FaBitcoin />
            </Radio>
            
            <Radio value="ethereum">
              <FaEthereum />
            </Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      <Button colorScheme="blue" mt={4} onClick={() => alert('Payment processing...')}>
        Pay Now
      </Button>
    </Flex>
  );
};

export default Index;
