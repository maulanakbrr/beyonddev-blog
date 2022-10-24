import Link from 'next/link'
import Layout from "@/components/Layout"
import Post from '@/components/Post'
import { getPosts } from '@/lib/posts'

export default function HomePage({posts }) {
  return (
    <Layout>
      <h1 className='text-5xl border-b-4 p-5 font-bold'>Latest Posts</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => (
          <Post post={post} key={index}/>
        ))}
      </div>

      <Link href="/blog">
        <a className='block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full'>Blog</a>
      </Link>
    </Layout>
  )
}

export const getStaticProps = async () => {
  
  return {
    props: {
      posts: getPosts().slice(0, 6)
    },

  }
}
