import Head from "next/head"
import Header from "./Header"

const Layout = ({title, keywords, description, children}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords}/>
        <meta name="description" content={description}/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <main className="container mx-auto xl:mx-4 my-7">{children}</main>
    </div>
  )
}

export default Layout

Layout.defaultProps = {
  title: 'Welcome to BeyondDev',
  keywords: 'development, programming, coding, blog',
  description: 'The best info and news in development'
}