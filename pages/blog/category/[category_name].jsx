import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Layout from "@/components/Layout"
import Post from '@/components/Post'
import { getPosts } from '@/lib/posts'

export default function CategoryPage({ posts, categoryName }) {
  return (
    <Layout>
      <h1 className='text-5xl border-b-4 p-5 font-bold'>Posts in {categoryName}</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => (
          <Post post={post} key={index}/>
        ))}
      </div>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'))

  const categories = files.map(filename => {
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

    const { data: frontmatter } = matter(markdownWithMeta)

    return frontmatter.category.toLowerCase()
  })

  const paths = categories.map(category => ({
    params: { category_name: category }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({params: {category_name}}) => {
  const categoryPosts = getPosts().filter(post => post.frontmatter.category.toLowerCase() === category_name)

  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name
    },

  }
}
