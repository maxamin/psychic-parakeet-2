import NavBar from "../components/HeaderNav";
import {Outlet} from "react-router-dom";
import NewNavbar from "../components/NavbarV2";

export default function Root() {
    return (
        <>



            <NewNavbar/>

                   <main id="main-content">
                       <Outlet />
                   </main>

        </>
    );
}