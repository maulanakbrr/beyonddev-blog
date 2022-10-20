import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {marked} from 'marked'
import sanitizeHtml from 'sanitize-html'
import Link from 'next/link'
import Layout from '@/components/Layout'
import CategoryLabel from '@/components/CategoryLabel'

const PostPage = ({frontmatter, content, slug}) => {
  // console.log(frontmatter)
  const { title, category, cover_image, author_image, author, date } = frontmatter
  return (
    <Layout title={title}>
      <Link href="/blog">Go Back</Link>

      <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt6">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-5xl mb-7">{title}</h1>
          <CategoryLabel>{category}</CategoryLabel>
        </div>

        <img src={cover_image} alt="" className='w-full rounded'/>

        <div className="flex justify-between items-center bg-gray-100 p-2 my-8">
          <div className='flex items-center'>
            <img src={author_image} alt="" className='mx-4 w-10 h-10 object-cover rounded-full hidden sm:block'/>
            <h4>{author}</h4>
          </div>

          <div className="mr-4">
            {date}
          </div>
        </div>

        <div className="blog-text mt-2">
        <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(marked.parse(content)) }}></div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', '')
    }
  }))

  // console.log('PATHS:: ', paths)

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({params: {slug}}) => {
  // console.log(slug)
  const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8')

  const { data: frontmatter, content } = matter(markdownWithMeta)
  return {
    props: {
      frontmatter,
      content,
      slug
    }
  }
}

export default PostPage