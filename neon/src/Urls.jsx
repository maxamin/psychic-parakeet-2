
import {
    createBrowserRouter,

} from "react-router-dom";

import AboutPage from "./pages/about";
import Root from "./pages/root";
import ErrorPage from "./pages/error";
import WelcomeScreen from "./components/WelcomeScreen";
import AuthScreen from "./components/AuthScreen";
import DiscoverPerformers from "./components/DiscoverPerformers2";
import PerformerProfile from "./components/PerformerProfile";
import ContactSupport from "./components/ContactSupport";
import SafetyPrivacy from "./components/SafetyPrivacy";
import Settings from "./components/Settings";
import MemberDashboard from "./components/MemberDashboard";
import BookingConfirmation from "./components/BookingConfirmation";
import BookingFlow from "./components/BookingFlow";
import Onboarding from "./blocks/Onboarding";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,

        children: [
            { index: true, element: <WelcomeScreen /> },
            {
                path: "about",
                element: <AboutPage/>,
            },
            {
                path: "auth",
                element: <AuthScreen/>
            },
            {
                path: "discover",
                element: <DiscoverPerformers/>
            },
            {
                path:"profile/:performerId",
                element: <PerformerProfile/>
            },
            {
                path: "booking",
                element: <BookingFlow/>
            },
            {
                path: "confirmation",
                element:<BookingConfirmation/>
            },
            {
                path: "dashboard",
                element:<MemberDashboard/>
            },
            {
                path: "settings",
                element: <Settings/>
            },
            {
                path: "safety",
                element: <SafetyPrivacy/>
            },
            {
                path: "support",
                element: <ContactSupport/>
            },
            {
                path: "start",
                element: <Onboarding/>
            }

        ],
    },
]);

{/*        <Route path="/auth" element={<AuthScreen/>}/>*/}
{/*        <Route path="/discover" element={<DiscoverPerformers/>}/>*/}
{/*        <Route path="/profile/:performerId" element={<PerformerProfile/>}/>*/}
{/*        <Route path="/booking" element={<BookingFlow/>}/>*/}
{/*        <Route path="/confirmation" element={<BookingConfirmation/>}/>*/}
{/*        <Route path="/dashboard" element={<MemberDashboard/>}/>*/}
{/*        <Route path="/settings" element={<Settings/>}/>*/}
{/*        <Route path="/safety" element={<SafetyPrivacy/>}/>*/}
{/*        <Route path="/support" element={<ContactSupport/>}/>*/}
{/*    </Routes>*/}
{/*</Router>*/}

export default router;