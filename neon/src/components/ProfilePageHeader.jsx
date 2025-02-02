import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaHeart, FaShareSquare, FaSave, FaEnvelope } from 'react-icons/fa';

const Index = () => {
  return (
    <VStack spacing={10}>
      {/* Page Header with profile component */}
      <Flex width="full" justifyContent="space-between" alignItems="center" p={5}>
        <VStack alignItems="flex-start" spacing={1}>
          <Heading size="md">Christoph Winston</Heading>
          <Text fontSize="sm">Software Engineer</Text>
          <Text fontSize="sm">Berlin, Germany</Text>
          <Tag>80.000 - 90.000</Tag>
        </VStack>
        <HStack>
          <Button leftIcon={<FaShareSquare />} size="sm">
            Share
          </Button>
          <Button leftIcon={<FaSave />} size="sm">
            Save
          </Button>
          <Button leftIcon={<FaEnvelope />} size="sm">
            Contact
          </Button>
        </HStack>
      </Flex>

      {/* Section Header with Tabs Component */}
      <Box width="full" p={5}>
        <Flex justifyContent="space-between" alignItems="center" mb={5}>
          <Heading size="md">Member overview</Heading>
          <Text>All registered users in the overview</Text>
        </Flex>
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Admins</Tab>
            <Tab>Moderators</Tab>
            <Tab>Users</Tab>
            <Tab>Invitations</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* Panel Content */}
            </TabPanel>
            {/* Other panels */}
          </TabPanels>
        </Tabs>
      </Box>

      {/* Quick view with horizontal gallery component */}
      <Flex width="full" p={5} alignItems="center">
        <Image
          src="https://images.unsplash.com/photo-1515117136347-78c558558c73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxBd2Vzb21lJTIwd2F0Y2h8ZW58MHx8fHwxNzA0MDUwOTI4fDA&ixlib=rb-4.0.3&q=80&w=1080"
          boxSize="150px"
          objectFit="cover"
          mr={5}
        />
        <VStack alignItems="flex-start" flex={1}>
          <Text fontSize="lg" fontWeight="bold">
            On Sale
          </Text>
          <Text fontSize="sm">Bamboo Tan</Text>
          <Text fontSize="xl" fontWeight="bold">
            $199.00
          </Text>
          <Text fontSize="sm">1 Reviews</Text>
          <Text fontSize="sm" noOfLines={3}>
            With a sleek design and a captivating essence, this is a modern Classic made for every occasion.
          </Text>
          <HStack spacing={1}>
            <Tag size="lg" variant="solid" bg="#000" />
            <Tag size="lg" variant="solid" bg="#666" />
            <Tag size="lg" variant="solid" bg="#BBB" />
          </HStack>
          <Text fontSize="sm">Low stock</Text>
          <HStack spacing={1}>
            <Tag size="lg" variant="outline" colorScheme="green">
              32mm
            </Tag>
            <Tag size="lg" variant="outline" colorScheme="green">
              36mm
            </Tag>
            <Tag size="lg" variant="outline" colorScheme="green">
              40mm
            </Tag>
          </HStack>
          <Text fontSize="sm" textDecoration="underline">
            View our sizing guide
          </Text>
          <Flex width="full" justifyContent="space-between" alignItems="center">
            <Text fontSize="sm">Quantity</Text>
            <Button leftIcon={<FaHeart />} size="sm" variant="outline">
              Favorite
            </Button>
          </Flex>
          <Button mt={3} colorScheme="green" variant="solid" size="md">
            View full details
          </Button>
        </VStack>
      </Flex>
    </VStack>
  );
};

export default Index;
