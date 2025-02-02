import React from "react";
import {Link as ChakraLink, LinkProps, Box, Flex, Text, Button, Stack, Link} from "@chakra-ui/react";
import Logo from "./Logo";
import {Link as RouteLink, Link as ReactRouterLink} from 'react-router-dom'

// import { ReactComponent as Logo } from "../crown.svg";


const NavBar = (props) => {
    const [isOpen, setIsOpen] = React.useState(true);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <NavBarContainer {...props}>
            <Logo />
            <MenuToggle toggle={toggle} isOpen={isOpen} />
            <MenuLinks isOpen={isOpen} />
        </NavBarContainer>
    );
};

const CloseIcon = () => (
    <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <title>Close</title>
        <path
            fill="white"
            d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
        />
    </svg>
);

const MenuIcon = () => (
    <svg
        width="24px"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
    >
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
    return (
        <Box display={{ base: "block", md: "none" }} onClick={toggle}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
        </Box>
    );
};


const NavLink = ({text}) => (
    <ChakraLink>
        <Text fontSize="xl">{text}</Text>
    </ChakraLink>
);

const NavBarLinkItem = ({to, text}) => (
    <ReactRouterLink to={to}>
        <NavLink text={text}/>
    </ReactRouterLink>
);

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
    return (
        <ChakraLink as={ReactRouterLink} to={to}>

                {children}

        </ChakraLink>
    );
};


// {/*        <Route path="/discover" element={<DiscoverPerformers/>}/>*/}
//
// {/*        <Route path="/profile/:performerId" element={<PerformerProfile/>}/>*/}
//
// {/*        <Route path="/booking" element={<BookingFlow/>}/>*/}
//
// {/*        <Route path="/confirmation" element={<BookingConfirmation/>}/>*/}
//
// {/*        <Route path="/dashboard" element={<MemberDashboard/>}/>*/}
//
// {/*        <Route path="/settings" element={<Settings/>}/>*/}
//
// {/*        <Route path="/safety" element={<SafetyPrivacy/>}/>*/}
//
// {/*        <Route path="/support" element={<ContactSupport/>}/>*/}

const MenuLinks = ({ isOpen }) => {
    return (
        <Box
            display={{ base: isOpen ? "block" : "none", md: "block" }}
            flexBasis={{ base: "100%", md: "auto" }}
        >
            <Stack
                spacing={8}
                align="center"
                justify={["center", "space-between", "flex-end", "flex-end"]}
                direction={["column", "row", "row", "row"]}
                pt={[4, 4, 0, 0]}
            >
                <NavBarLinkItem to="/" text="home"></NavBarLinkItem>
                <NavBarLinkItem to="/about" text="about"></NavBarLinkItem>
                <NavBarLinkItem to="/support" text="support"></NavBarLinkItem>
                <NavBarLinkItem to="safety" text="privacy & safety"></NavBarLinkItem>
                <NavBarLinkItem to="settings" text="settings"></NavBarLinkItem>
                <NavBarLinkItem to="dashboard" text="dashboard"></NavBarLinkItem>
                <NavBarLinkItem to="discover" text="discover"></NavBarLinkItem>

            </Stack>
        </Box>
    );
};

const NavBarContainer = ({ children, ...props }) => {
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            mb={8}
            p={8}
            bg={["primary.500", "primary.500", "transparent", "transparent"]}
            color={["white", "white", "primary.700", "primary.700"]}
            {...props}
        >
            {children}
        </Flex>
    );
};

export default NavBar;