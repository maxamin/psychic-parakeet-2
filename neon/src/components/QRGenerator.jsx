import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  VStack,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { FaQrcode } from 'react-icons/fa';

const QRCodeCanvas = ({ isAnimating }) => {
  const size = 256; // Canvas size
  const blockSize = 16; // Size of each block in the QR code
  const blocksPerSide = size / blockSize;

  // State to keep track of the blocks array
  const [blocks, setBlocks] = useState(
    Array.from({ length: blocksPerSide }, () =>
      Array.from({ length: blocksPerSide }, () => Math.random() >= 0.5)
    )
  );

  // Effect to shuffle blocks when animating
  useEffect(() => {
    let interval;
    if (isAnimating) {
      interval = setInterval(() => {
        setBlocks(blocks =>
          blocks.map(row => [...row].sort(() => Math.random() - 0.5))
        );
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <Box
      width={`${size}px`}
      height={`${size}px`}
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.300"
      position="relative"
    >
      {blocks.map((row, y) =>
        row.map((isFilled, x) => (
          <Box
            key={`${x}-${y}`}
            position="absolute"
            top={`${y * blockSize}px`}
            left={`${x * blockSize}px`}
            width={`${blockSize}px`}
            height={`${blockSize}px`}
            backgroundColor={isFilled ? 'black' : 'white'}
            animation="appear 0.5s ease-in-out forwards"
            style={{ animationDelay: `${(x + y) * 50}ms` }}
          />
        ))
      )}
    </Box>
  );
};

const Index = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <Container centerContent>
      <VStack spacing={8} p={8}>
        <Heading>Welcome to the QR Code Generator</Heading>
        

        <Button
          leftIcon={isLoading ? <Spinner size="sm" /> : <FaQrcode />}
          colorScheme="blue"
          onClick={() => {
            setIsLoading(true);
            setShowQRCode(false); // Reset QR code visibility
            setIsAnimating(true);
            setTimeout(() => {
              setIsLoading(false);
              setIsAnimating(false);
              setShowQRCode(true); // Show QR code after animation
            }, 10000);
          }}
          isLoading={isLoading}
        >
          Generate QR Code
        </Button>
        {showQRCode && <QRCodeCanvas isAnimating={isAnimating} />}
      </VStack>
    </Container>
  );
};

export default Index;
