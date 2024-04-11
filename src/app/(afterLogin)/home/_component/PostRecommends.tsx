'use client';

import Post from '@/app/(afterLogin)/_component/Post';
import { getPostRecommends } from '@/app/(afterLogin)/home/_lib/getPostRecommends';
import { Post as IPost } from '@/model/Post';
import { useQuery } from '@tanstack/react-query';

export default function PostRecommends() {
  const { data } = useQuery<IPost[]>({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000, // fresh -> stale 시간, 1분
    // cacheTime도 있음 현재는 gcTime으로 바뀜 Garbage Collector Time 디폴트 5분
    // inactive와 같이 살펴봐야 하는데, 안 쓰는 데이터는 inactive 화면에서 데이터를 쓰고 있는지 여부
    // gc가 브라우저 메모리를 관리해줌.
    // 5분 지나면 캐시 날라가서 새로 불러와야 됨. 즉, gcTime보다 staleTime은 짧아야됨
  });
  return (
    <>
      {data?.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </>
  );
}
