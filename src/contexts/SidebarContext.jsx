import React, {createContext, useContext, useState} from 'react'

const SidebarContext = createContext();

export const SidebarProvider = ({ children}) => {
    const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    console.log("toggle triggered");
};
    const closeSidebar = () => setIsOpen(false);

    const value = {
        isOpen, toggleSidebar, closeSidebar
    }
    
    return (
        <SidebarContext.Provider value ={value}>
            {children}
        </SidebarContext.Provider>
    )
}

export const useSidebar = () => useContext(SidebarContext)
export default SidebarProvider;