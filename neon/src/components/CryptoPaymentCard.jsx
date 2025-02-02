import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Input,
  VStack,
  Center,
  Spinner,
  useToast,
  Image,
} from '@chakra-ui/react';
import { FaQrcode } from 'react-icons/fa';

const Index = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionComplete, setTransactionComplete] = useState(false);
  const toast = useToast();

  const fakePublicKey = '0x123456789ABCDEF'; // Fake public key
  const fakeAmounts = {
    bitcoin: '0.001 BTC',
    litecoin: '0.1 LTC',
    ethereum: '0.01 ETH',
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Simulate network request with a timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setTransactionComplete(true);

      // Display success message
      toast({
        title: 'Payment received.',
        description: "We've received your cryptocurrency payment.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }, 10000); // 10 seconds delay
  };

  const handleSelectChange = (event) => {
    setSelectedCrypto(event.target.value);
  };

  return (
    <Center h="100vh" flexDirection="column">
      <VStack spacing={4} align="stretch">
        <Box w="100%" p={4} borderWidth="1px" borderRadius="lg">
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Select Cryptocurrency</FormLabel>
              <Select onChange={handleSelectChange} placeholder="Select option">
                <option value="bitcoin">Bitcoin</option>
                <option value="litecoin">Litecoin</option>
                <option value="ethereum">Ethereum</option>
              </Select>
            </FormControl>

            <FormControl mt={4} isReadOnly>
              <FormLabel>Amount</FormLabel>
              <Input value={fakeAmounts[selectedCrypto]} readOnly />
            </FormControl>

            <FormControl mt={4} isReadOnly>
              <FormLabel>Send to Wallet (Public Key)</FormLabel>
              <Input value={fakePublicKey} readOnly />
            </FormControl>

            <Button mt={4} type="submit" colorScheme="blue" leftIcon={<FaQrcode />} disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Submit Payment'}
            </Button>
          </form>
        </Box>

        {isSubmitting && (
          <Center p={4}>
            <Spinner size="xl" />
          </Center>
        )}

        {transactionComplete && !isSubmitting && (
          <Center p={4}>
            <Box textAlign="center">
              <Image src="https://images.unsplash.com/photo-1595079676339-1534801ad6cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxRUiUyMGNvZGV8ZW58MHx8fHwxNzA0MDI0NDY0fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="QR Code" boxSize="150px" />
              <p>Scan the QR code with your wallet app to complete the transaction.</p>
            </Box>
          </Center>
        )}
      </VStack>
    </Center>
  );
};

export default Index;
