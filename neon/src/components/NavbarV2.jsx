import React from "react";
import Logo from "./Logo";

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton, Link as ChakraLink, Text,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import * as PropTypes from "prop-types";
import {Link as ReactRouterLink} from "react-router-dom";


const NavLink = ({text, full}) => (
    <ChakraLink>
      <Button variant="ghost">{text}</Button>
    </ChakraLink>
);

const NavBarLinkItem = ({to, text, full=false}) => (
    <ReactRouterLink to={to}>
      <NavLink text={text} full={full}/>
    </ReactRouterLink>
);
const NewNavbar = () => {
  const bg = useColorModeValue("dark", "white");
  const mobileNav = useDisclosure();
  return (
    <React.Fragment>
      <chakra.header
        w="full"
        px={{
          base: 2,
          sm: 4,
        }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              <Logo />
            </chakra.a>

          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{
                base: "none",
                md: "inline-flex",
              }}
            >
              {/*<Button variant="ghost">Features</Button>*/}
              {/*<Button variant="ghost">Pricing</Button>*/}
              {/*<Button variant="ghost">Blog</Button>*/}
              {/*<Button variant="ghost">Company</Button>*/}
              {/*<Button variant="ghost">Sign in</Button>*/}
              <NavBarLinkItem to="/" text="home"></NavBarLinkItem>
              <NavBarLinkItem to="/about" text="about"></NavBarLinkItem>
              <NavBarLinkItem to="/support" text="support"></NavBarLinkItem>
              <NavBarLinkItem to="safety" text="privacy & safety"></NavBarLinkItem>
              <NavBarLinkItem to="settings" text="settings"></NavBarLinkItem>
              <NavBarLinkItem to="dashboard" text="dashboard"></NavBarLinkItem>
              <NavBarLinkItem to="discover" text="discover"></NavBarLinkItem>
            </HStack>
            <Button colorScheme="brand" size="sm">
              Get Started
            </Button>
            <Box
              display={{
                base: "inline-flex",
                md: "none",
              }}
            >
              <IconButton
                display={{
                  base: "flex",
                  md: "none",
                }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{
                  color: "inherit",
                }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                <NavBarLinkItem to="/" text="home"></NavBarLinkItem>
                <NavBarLinkItem to="/about" text="about"></NavBarLinkItem>
                <NavBarLinkItem to="/support" text="support"></NavBarLinkItem>
                <NavBarLinkItem to="safety" text="privacy & safety"></NavBarLinkItem>
                <NavBarLinkItem to="settings" text="settings"></NavBarLinkItem>
                <NavBarLinkItem to="dashboard" text="dashboard"></NavBarLinkItem>
                <NavBarLinkItem to="discover" text="discover"></NavBarLinkItem>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};


export default NewNavbar