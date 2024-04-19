import { FC, ReactNode } from "react";
import Header from "./header";

interface Props {
    children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <div className="bg-pa_two   min-h-screen">
                <Header />
                <div className="pt-4">
                    {children}
                </div>
                {/* <Footer /> */}
            </div>
        </>
    );
};

export default Layout;
