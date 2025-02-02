import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Root from "../pages/root";
import {PayMe} from "../components/PayMe";
import Index from "../blocks/Banner";
import OverviewSection from "../blocks/Onboarding";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Root">
                <Root/>
            </ComponentPreview>
            <ComponentPreview path="/PayMe">
                <PayMe/>
            </ComponentPreview>
            <ComponentPreview path="/Index">
                <Index/>
            </ComponentPreview>
            <ComponentPreview path="/Onboarding">
                <OverviewSection/>
            </ComponentPreview>
            <ComponentPreview path="/OverviewSection">
                <OverviewSection/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews