import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Layout from "@/components/Layout"
import Post from '@/components/Post'
import CategoryList from '@/components/CategoryList'
import { getPosts } from '@/lib/posts'

export default function CategoryPage({ posts, categoryName, categories }) {
  return (
    <Layout>
      <div className="flex justify-between flex-col md:flex-row">
        <div className="w-3/4 mr-10">
        <h1 className='text-5xl border-b-4 p-5 font-bold'>Posts in {categoryName}</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post post={post} key={index}/>
            ))}
          </div>
        </div>

        <div className='w-1/4'>
          <CategoryList categories={categories}/>
        </div>
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
  const posts = getPosts()
  const categoryPosts = posts.filter(post => post.frontmatter.category.toLowerCase() === category_name)

  // get categories
  const categoriesData = posts.map(post => post.frontmatter.category)
  const categories = [...new Set(categoriesData)]

  return {
    props: {
      posts: categoryPosts,
      categories,
      categoryName: category_name
    },

  }
}
