import Layout from "../components/Layout"

const AboutPage = () => {
  return (
    <Layout title="About BeyondDev">
      <h1 className="text-5xl border-b-4 pb-5 font-bold">
        About
      </h1>

      <div className="bg-white shadow-md rounded-lg px-10 py-6 mt-6">
        <h3 className="text-2xl mb-5">
          BeyondDev Blog
        </h3>

        <p className="mb-3">
          This is a blog built with Next.js and markdown
        </p>

        <p>
          <span className="font-bold">
            Version 1.0.0
          </span>
        </p>
      </div>
    </Layout>
  )
}

export default AboutPage