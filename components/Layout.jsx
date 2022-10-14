import Head from "next/head"

const Layout = ({title, keywords, description, children}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords}/>
        <meta name="description" content={description}/>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto my-7">{children}</main>
    </div>
  )
}

export default Layout

Layout.defaultProps = {
  title: 'Welcome to BeyondDev',
  keywords: 'development, programming, coding, blog',
  description: 'The best info and news in development'
}