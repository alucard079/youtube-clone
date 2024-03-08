import { useState } from "react"
import { Menu, Upload, Bell, User, Search, Mic, ArrowLeft, } from "lucide-react"
import Logo from "../assets/Logo.png"
import { Button } from "../components/Button"
import { useSidebarContext } from "../contexts/SidebarContext"

export function PageHeader() {
    const [showFullWidthSearch, setShowFullWidthSearch] = useState(false)
    return (
        <div className="flex gap-10 lg:gap-56 justify-between pt-3 mb-6 mx-4">
            <PageHeaderFirstSection hidden={showFullWidthSearch}/>
            <form className={`gap-4 flex-grow justify-center items-center ${showFullWidthSearch ? 'flex' : 'hidden md:flex '}`}>
                <div className="flex flex-grow max-w=[400px]">
                    <Button
                        className={`py-2 px-4 rounded-full border-secondary-border
                        border border-1-0 flex-shrink-0 mr-2 ${showFullWidthSearch ? 'flex' : 'hidden'}`}
                        onClick={() => setShowFullWidthSearch(false)}
                    >
                        <ArrowLeft />
                    </Button>
                    <input
                        type="search"
                        placeholder="Search"
                        className="rounded-l-full border border-secondary-border 
                        shadow-inner shadow-secondary py-1 px-4 text-lg w-full
                        focus:border-blue-500 outline-none"
                    />
                    <Button className="py-2 px-4 rounded-r-full border-secondary-border
                        border border-1-0 flex-shrink-0"
                    >
                        <Search />
                    </Button>
                </div>
                <div>
                    <Button size="icon" className="flex-shrink-0">
                        <Mic />
                    </Button>
                </div>
            </form>
            <div className={`flex flex-shrink-0 md:gap-2 items-center ${showFullWidthSearch ? 'hidden' : 'flex'}`}>
                <Button onClick={() => setShowFullWidthSearch(true)} size="icon" variant="ghost" className="md:hidden">
                    <Search />
                </Button>
                <Button size="icon" variant="ghost" className="md:hidden">
                    <Mic />
                </Button>
                <Button size="icon" variant="ghost">
                    <Upload />
                </Button>
                <Button size="icon" variant="ghost">
                    <Bell />
                </Button>
                <Button size="icon" variant="ghost">
                    <User />
                </Button>
            </div>
        </div>
    )
}

type PageHeaderFirstSectionProps = {
    hidden?: boolean
}

export function PageHeaderFirstSection({ hidden = false } :PageHeaderFirstSectionProps) {
    const { toggle } = useSidebarContext()

    return (
        <div className={`flex flex-shrink-0 gap-4 items-center ${hidden ? 'hidden' : 'flex'}`}>
            <Button onClick={toggle} variant='ghost' size="icon">
                <Menu />
            </Button>
            <a href="/">
                <img src={Logo} alt="Logo" className="h-14" />
            </a>
        </div>
    )
}