import { Home, Repeat, Clapperboard, Library, ChevronDown, ChevronUp, PlaySquare, Clock, ListVideo, Flame, ShoppingBag, Music2, Film, Gamepad2, Trophy, Newspaper, Lightbulb, Shirt, Podcast } from "lucide-react"
import { ElementType, ReactNode, Children, useState } from "react"
import { buttonStyles, Button } from "../components/Button"
import { twMerge } from "tailwind-merge"
import { playlists, subscriptions } from "../data/sidebar"
import { useSidebarContext } from "../contexts/SidebarContext"
import { PageHeaderFirstSection } from "./PageHeader"

export function Sidebar() {
    const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
    return (
        <>
            <aside className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${isLargeOpen ? 'lg:hidden' : 'lg:flex'}`}>
                <SmallSidebarItem Icon={Home} title="Home" url="/"/>
                <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts"/>
                <SmallSidebarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions"/>
                <SmallSidebarItem Icon={Library} title="Library" url="/library"/>
            </aside>
            {isSmallOpen && (
                <div onClick={close} className="lg:hidden fixed inset-0 z-index[999] bg-secondary-dark opacity-50"/>
            )}
            <aside 
            className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden flex-col gap-2 px-2 pb-4 lg:flex 
                ${isLargeOpen ? 'lg:flex' : 'lg:hidden'} ${isSmallOpen ? 'flex z-[999] bg-white max-h-screen' : 'hidden'}
            `}>
                <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
                    <PageHeaderFirstSection/>
                </div>
                <LargeSidebarSection>
                    <LargeSidebarItem IconOrImageUrl={Home} title="Home" url="/"/>
                    <LargeSidebarItem IconOrImageUrl={Clapperboard} title="Subscriptions" url="/subscriptions"/>
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection visibleItemCount={5}>
                    <LargeSidebarItem IconOrImageUrl={Library} title="History" url="/history"/>
                    <LargeSidebarItem IconOrImageUrl={PlaySquare} title="Your Videos" url="/your-videos"/>
                    <LargeSidebarItem IconOrImageUrl={Clock} title="Watch Later" url="/playlist?list=WL"/>
                    {playlists.map(playlist => (
                        <LargeSidebarItem 
                            key={playlist.id} 
                            IconOrImageUrl={ListVideo} 
                            title={playlist.name} 
                            url={`/playlist?list=${playlist.id}`}
                        />
                    ))}
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection visibleItemCount={5} title="Subscriptions">
                    {subscriptions.map(subscription => (
                        <LargeSidebarItem 
                            key={subscription.id} 
                            IconOrImageUrl={subscription.imgUrl} 
                            title={subscription.channelName} 
                            url={`/subscription?list=${subscription.id}`}
                        />
                    ))}
                </LargeSidebarSection>
                <hr />
                <LargeSidebarSection visibleItemCount={5} title="Explore">
                    <LargeSidebarItem IconOrImageUrl={Flame} title="Trending" url="/trending"/>
                    <LargeSidebarItem IconOrImageUrl={ShoppingBag} title="Shopping" url="/shopping"/>
                    <LargeSidebarItem IconOrImageUrl={Music2} title="Music" url="/music"/>
                    <LargeSidebarItem IconOrImageUrl={Film} title="Movies & TV" url="/movies-tv"/>
                    <LargeSidebarItem IconOrImageUrl={Gamepad2} title="Gaming" url="/gaming"/>
                    <LargeSidebarItem IconOrImageUrl={Newspaper} title="News" url="/news"/>
                    <LargeSidebarItem IconOrImageUrl={Trophy} title="Sports" url="/sports"/>
                    <LargeSidebarItem IconOrImageUrl={Lightbulb} title="Learning" url="/learning"/>
                    <LargeSidebarItem IconOrImageUrl={Shirt} title="Fashion & Beauty" url="/fashion-beauty"/>
                    <LargeSidebarItem IconOrImageUrl={Podcast} title="Podcast" url="/podcast"/>
                </LargeSidebarSection>
            </aside>
        </>
    )
}

type SmallSidebarItemProps = {
    Icon: ElementType,
    title: string,
    url: string
}

function SmallSidebarItem({ Icon, title, url }:SmallSidebarItemProps) {
    return (
        <a href={url} className={twMerge(buttonStyles({variant: "ghost"}), "py-4 px-1 flex flex-col items-center rounded-lg gap-1")}>
            <Icon className="w-6 h-6"/>
            <div className="text-sm">{title}</div>
        </a>
    )
}

type LargeSidebarSectionProps = {
    children: ReactNode,
    title?: string,
    visibleItemCount?: number
}

function LargeSidebarSection({ children, title, visibleItemCount = Number.POSITIVE_INFINITY }:LargeSidebarSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const childrenArray = Children.toArray(children).flat()
    const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount)
    const showExpandButton = childrenArray.length > visibleItemCount
    const ButtonIcon = isExpanded ? ChevronUp : ChevronDown

    return (
        <div>
            {title && 
                <div className="ml-4 mt-2 text-lg mb-1">
                    {title}
                </div>
            }
            {visibleChildren}
            {showExpandButton && 
                <Button 
                    variant="ghost" 
                    className="w-full flex items-center rounded-lg gap-4 p-3"
                    onClick={() => setIsExpanded(e => !e)}
                > 
                    <ButtonIcon className="w-6 h-6"/>
                    <div>
                        {isExpanded ? 'Show Less' : 'Show More'}
                    </div>
                </Button>
            }
        </div>
    );
}

type LargeSidebarItemProps = {
    IconOrImageUrl: ElementType | string,
    title: string,
    url: string,
    isActive?: boolean
}

export function LargeSidebarItem({ IconOrImageUrl, title, url, isActive = false }:LargeSidebarItemProps) {
    return (
        <a 
            href={url} 
            className={twMerge(buttonStyles({variant: "ghost"}), `w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined}`)}
        >
            {typeof IconOrImageUrl === "string" ? (
                <img src={IconOrImageUrl} className="w-6 h-6 rounded-full"></img>
            ) : (
                <IconOrImageUrl className="w-6 h-6"/>
            )}
            <div className="whitepace-nowrap overflow-hidden text-ellipsis">{title}</div>
        </a>
    )
}