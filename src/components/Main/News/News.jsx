import axios from 'axios';
import clsx from 'clsx';
import styles from './news.module.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Container from '../../../Container';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchArticles = useCallback(async (page) => {
    try {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: 'animals',
          language: 'en',
          page,
          pageSize: 5,
        },
        headers: {
          'X-Api-Key': import.meta.env.VITE_NEWS_KEY,
        },
      });
      const newArticles = response.data.articles;
      if (newArticles.length === 0) {
        setHasMore(false);
      } else {
        setArticles((prev) => [...prev, ...newArticles]);
      }
    } catch (error) {
      console.log(`There's an issue: ${error}`);
    }
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchArticles(page);
  }, [page, fetchArticles]); //
  const uniqueArticles = useMemo(() => {
    return articles.filter(
      (item, index, self) => index === self.findIndex((a) => a.url === item.url)
    );
  }, [articles]);

  return (
    <section className={clsx(styles.newsArticles)}>
      <Container
        className={clsx(styles.newsArticlesContent)}
        dataAnimate="fadeInRight"
      >
        <h2 className={clsx(styles.newsArticlesContentTitle)}>
          Interacting with our pets
        </h2>
        <div className={clsx(styles.articles)}>
          <AnimatePresence mode="popLayout" initial={false}>
            {uniqueArticles.map((item, index) => (
              <motion.a
                href={item.url}
                target="blank"
                className={clsx(styles.article)}
                key={item.url}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: (index % 5) * 0.1,
                  duration: 0.4,
                }}
              >
                <img
                  src={item.urlToImage}
                  alt={item.author}
                  className={clsx(styles.articleImg)}
                />
                <h5 className={clsx(styles.articleTitle)}>{item.title}</h5>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
        {hasMore && (
          <motion.button
            layout
            onClick={() => setPage((prev) => prev + 1)}
            className={clsx(styles.newsArticlesContentBtn)}
          >
            See more
          </motion.button>
        )}
      </Container>
    </section>
  );
};

export default News;
