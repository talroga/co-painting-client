import CoPainting from "../../MainArea/CoPainting/CoPainting";
import Header from "../Header/Header";
import "./Layout.css";
import React from "react";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <header>
                <Header />
            </header>
            <main>
                <CoPainting/>
            </main>
        </div>
    );
}

export default Layout;
