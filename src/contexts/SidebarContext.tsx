import { ReactNode, createContext, useContext, useState, useEffect } from "react"

type SidebarProviderProps = {
    children: ReactNode
}

type SidebarContextType = {
    isLargeOpen: boolean
    isSmallOpen: boolean
    toggle: () => void
    close: () => void
}

const SideBarContext = 
createContext<SidebarContextType | null>(null)

export function useSidebarContext() {
    const value = useContext(SideBarContext)
    if (value == null) throw Error('Cannot use outside of provider')

    return value
}

export function SidebarProvider({ children }:
    SidebarProviderProps) {
    const [isLargeOpen, setIsLargeOpen] = useState(true) 
    const [isSmallOpen, setIsSmallOpen] = useState(false) 

    useEffect(() => {
        const handler = () => {
            if(!isScreenSmall()) setIsSmallOpen(false)
        }

        window.addEventListener("resize", handler)

        return () => {
            window.removeEventListener("resize", handler)
        }
    }, [])
    
    function isScreenSmall() {
        return window.innerWidth < 1024
    }

    function toggle() {
        if(isScreenSmall()) {
            setIsSmallOpen(s => !s)
        } else {
            setIsLargeOpen(l => !l)
        }
    }

    function close() {
        if(isScreenSmall()) {
            setIsSmallOpen(false)
        } else {
            setIsLargeOpen(false)
        }
    }
    
    return (
        <SideBarContext.Provider value={{
            isLargeOpen,
            isSmallOpen,
            toggle,
            close
        }}>
            {children}
        </SideBarContext.Provider>
    )
}