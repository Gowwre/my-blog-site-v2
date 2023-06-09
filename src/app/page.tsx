import ArticleList from '@/components/ArticleList';
import { getSortedPostData } from '@/lib/articles';

function Home() {
  const data = getSortedPostData();
  return (
    <>
      <ArticleList data={data} />
    </>
  );
}

export default Home