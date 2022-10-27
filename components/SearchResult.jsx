import Post from "./Post"

const SearchResult = ({results}) => {
  return (
    <div className='absolute top-20 right-0 md:right-10 z-10 border-4 border-gray-500 bg-white text-black w-full md:w-6/12 rounded-2xl'>
      <div className="p-10">
        <h2 className="text-3xl mb-3">{results.length} Results</h2>
        {
          results.map((res, idx) => (
            <Post key={idx} post={res} compact/>
          ))
        }
      </div>
    </div>
  )
}

export default SearchResult