import React from 'react';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import {
    ChakraProvider,

    Link,
    Text,

    HStack, StackDivider, Heading

} from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
import {BrowserRouter as Router, Route, Routes, Link as RouteLink, RouterProvider} from 'react-router-dom';


import {default as neonTempestTheme, simpleDarkTheme} from "./theme";
import router from "./Urls";
import {ReactQueryDevtools} from "react-query/devtools";
// import Layout from "./layout";

const NavLink = ({text}) => (
    <Link>
        <Text fontSize="xl">{text}</Text>
    </Link>
);
const NavBar = () => (
    <HStack spacing={3} divider={<StackDivider/>} as="nav">
        <RouteLink to="/">
            <NavLink text="Home"/>
        </RouteLink>
        <RouteLink to="/about">
            <NavLink text="About"/>
        </RouteLink>
    </HStack>
);

const AboutPage = () => {
    return (
        <div>
            <Heading as="h1" mb="4">
                About
            </Heading>

        </div>
    );
};
const queryClient = new QueryClient()
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={neonTempestTheme}>
                <RouterProvider router={router}/>
                <ReactQueryDevtools initialIsOpen={false} />

            </ChakraProvider>
        </QueryClientProvider>
    );
}

export default App;
