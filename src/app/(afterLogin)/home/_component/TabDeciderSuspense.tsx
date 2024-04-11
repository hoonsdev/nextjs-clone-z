import TabDecider from '@/app/(afterLogin)/home/_component/TabDecider';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getPostRecommends } from '@/app/(afterLogin)/home/_lib/getPostRecommends';

export default async function TabDeciderSuspense() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    // 이런 키를 가지고 있는 애들은 queryFn을 실행해라
    // 배열이 하나의 키라고 생각하면 됨 -> 키 값 가져오고 싶으면 queryClient.getQueryData(['posts', 'recommends'])
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    initialPageParam: 0, // infinity scroll 할 때 커서 값
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <TabDecider />
    </HydrationBoundary>
  );
}
