import { HeroHeader } from "@/components/header"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
    const menuItems = [
        { name: 'Home', href: '/' },
        { name: 'About us', to: '/' },
        { name: 'Contact us', href: '/' }
    ]
  return (
    <div className="flex flex-col">
      
      {/* Header */}
      <HeroHeader menu={menuItems}/>

      {/* Page Content */}
      <main className="flex-1">
        {children}
      </main>

    </div>
  )
}
