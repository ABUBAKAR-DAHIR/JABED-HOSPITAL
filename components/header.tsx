'use client'
import Link from 'next/link'
import { Link as ScrollLink } from 'react-scroll'
import { Menu, X } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { ModeToggle } from './ModeToggle'
import { SpinnerCustom } from './SpinnerCustom'
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Logo from './Logo'



export type HeaderMenuItem = {
    name: string,
    to?: string,
    href? : string
}
export const HeroHeader = ({menu} : {menu: HeaderMenuItem[]}) => {
    const [menuState, setMenuState] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [loggingOut, setLogginOut] = useState<boolean>()
    const [loggingIn, setLoggingIn] = useState<boolean>()
    const [registering, setRegistering] = useState<boolean>()

    const router = useRouter()


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const client = useKindeBrowserClient();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const u = await client.getUser();
            setUser(u);
        };
        fetchUser();
    }, [client]);


    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-20 w-full px-2">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12 ', isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex  flex-wrap items-center justify-between gap-6 py-6 lg:gap-0 lg:py-6">
                        <div className="flex w-full justify-between lg:w-auto">
                            <ScrollLink
                                to='header'
                                aria-label="home"
                                smooth
                                duration={500}
                                className="flex items-center space-x-2 cursor-pointer"
                                onClick={() => router.push('/')}>
                                <Logo />
                            </ScrollLink>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-6 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menu.map((item, index) => (
                                    <li key={index}>
                                        {item.to ? (
                                            // Scroll to section if 'to' exists
                                            <ScrollLink
                                                to={item.to}
                                                smooth={true}
                                                duration={500}
                                                offset={-100}
                                                spy={true}
                                                activeClass='text-red-700'
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150 cursor-pointer"
                                                >
                                                {item.name}
                                            </ScrollLink>
                                        ) : (
                                            // Normal Next.js route
                                            <Link
                                                href={item.href!}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150"
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>

                        </div>

                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menu.map((item, index) => (
                                        <li key={index}>
                                            {item.to ? (
                                            // Scroll to section if 'to' exists
                                            <ScrollLink
                                                to={item.to}
                                                smooth={true}
                                                duration={500}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150 cursor-pointer"
                                                >
                                                {item.name}
                                            </ScrollLink>
                                        ) : (
                                            // Normal Next.js route
                                            <Link
                                                href={item.href!}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150"
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col items-center justify-center space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                {
                                    user? (
                                        <>
                                            <p className='capitalize'>{user.given_name}</p>
                                            <LogoutLink className={`${buttonVariants({variant: "secondary"})} w-20 h-10`} onClick={() => setLogginOut(true)}>{loggingOut? <SpinnerCustom /> : "Logout"}</LogoutLink>
                                        </>
                                    ): 
                                    <div className='space-x-3 '>
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm"
                                            className={cn(isScrolled && 'lg:hidden')}>
                                            {/* <Link href="#">
                                                <span>Login</span>
                                            </Link> */}
                                            <LoginLink className = {`${buttonVariants({variant: "secondary"})} w-20 h-10`} onClick={() => setLoggingIn(true)}>{loggingIn? <SpinnerCustom /> : "Sign in"}</LoginLink>
                                        </Button>
                                        <Button
                                            asChild
                                            size="sm"
                                            className={cn(isScrolled && 'lg:hidden')}>
                                            {/* <Link href="#">
                                                <span>Sign Up</span>
                                            </Link> */}
                                            <RegisterLink className = {`${buttonVariants({variant: "default"})} w-20 h-10`} onClick={() => setRegistering(true)}>{registering? <SpinnerCustom /> : "Sign up"}</RegisterLink>
                                        </Button>


                                        <Button
                                            asChild
                                            size="sm"
                                            className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}>
                                            {/* <Link href="#">
                                                <span>Get Started</span>
                                            </Link> */}
                                            <RegisterLink className = {cn(isScrolled ? 'lg:inline-flex' : 'hidden')}>Get Started</RegisterLink>
                                        </Button>
                                    </div>

                                }
                                <ModeToggle className='ml-3'/>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
