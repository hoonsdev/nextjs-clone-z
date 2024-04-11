'use client';

import styles from '@/app/(afterLogin)/home/home.module.css';

import Post from '@/app/(afterLogin)/_component/Post';
import { getPostRecommends } from '@/app/(afterLogin)/home/_lib/getPostRecommends';
import { Post as IPost } from '@/model/Post';
import { InfiniteData, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function PostRecommends() {
  const { data, fetchNextPage, hasNextPage, isFetching } =
    useSuspenseInfiniteQuery<
      IPost[],
      Object,
      InfiniteData<IPost[]>,
      [_1: string, _2: string],
      number
    >({
      queryKey: ['posts', 'recommends'],
      queryFn: getPostRecommends,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
      staleTime: 60 * 1000, // fresh -> stale 시간, 1분
      // cacheTime도 있음 현재는 gcTime으로 바뀜 Garbage Collector Time 디폴트 5분
      // inactive와 같이 살펴봐야 하는데, 안 쓰는 데이터는 inactive 화면에서 데이터를 쓰고 있는지 여부
      // gc가 브라우저 메모리를 관리해줌.
      // 5분 지나면 캐시 날라가서 새로 불러와야 됨. 즉, gcTime보다 staleTime은 짧아야됨
      gcTime: 300 * 1000,
    });
  const { ref, inView } = useInView({ threshold: 0, delay: 0 });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }}></div>
    </>
  );
}
