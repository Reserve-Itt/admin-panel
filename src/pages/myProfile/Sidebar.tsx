import React, { useState } from "react";


interface SidebarProps {
    links: { name: string; url: string }[];
    isOpen: boolean;
    handleToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ links, isOpen, handleToggle }) => {
    return (
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <div className="toggle-button" onClick={handleToggle}>
                {isOpen ? "Close" : "Open"}
            </div>
            <div className="links">
                {links.map((link) => (
                    <a href={link.url} key={link.url}>
                        {link.name}
                    </a>
                ))}
            </div>
        </div>
    );
};

// Dummy data
const links = [
    { name: "Home", url: "#" },
    { name: "About", url: "#" },
    { name: "Services", url: "#" },
    { name: "Contact", url: "#" },
];

const App = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return <Sidebar links={links} isOpen={isOpen} handleToggle={handleToggle} />;
};

export default App;
