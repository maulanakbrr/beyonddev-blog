import fs from 'fs'
import path from 'path'
import Layout from "@/components/Layout"
import Post from '@/components/Post'
import CategoryList from '@/components/CategoryList'
import Pagination from '@/components/Pagination'
import { POSTS_PER_PAGE } from '@/config/index'
import { getPosts } from '@/lib/posts'

const BlogPage = ({ posts, numPages, categories, currentPage }) => {
  console.log('CATT:: ', categories)
  return (
    <Layout>
      <div className="flex justify-between flex-col md:flex-row">
        <div className="w-3/4 mr-10">
          <h1 className='text-5xl border-b-4 p-5 font-bold'>Blog</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post post={post} key={index}/>
            ))}
          </div>

          <Pagination currentPage={currentPage} numPages={numPages}/>
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

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE)

  let paths = []

  for(let i=1; i <= numPages; i++){
    paths.push({
      params: { page_index: i.toString()}
    })
  }

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({params}) => {
  const page = parseInt((params && params.page_index) || 1) 

  const posts = getPosts()

  // get categories
  const categoriesData = posts.map(post => post.frontmatter.category)
  const categories = categoriesData.reduce((arr, el) => {
    const isAnySelectedCategory = arr.find(item => item === el)

    if (isAnySelectedCategory){
      return arr
    } else {
      arr.push(el)
      return arr
    }
  }, [])

  // one line to create and filter categories
  // const categories = [...new Set(categoriesData)]

  const numPages = Math.ceil(getPosts().length / POSTS_PER_PAGE)
  const pageIndex = page - 1
  const orderedPosts = posts.slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE)

  return {
    props: {
      posts: orderedPosts,
      numPages,
      categories: categories,
      currentPage: page
    },

  }
}

export default BlogPage