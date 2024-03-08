import Navbar from '@/components/AdminNavbar'
export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section>
      

<Navbar />
    


      {children}</section>
  }
