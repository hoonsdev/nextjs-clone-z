'use client';

import Trend from '@/app/(afterLogin)/_component/Trend';
import { getTrends } from '@/app/(afterLogin)/_lib/getTrends';
import { Hashtag } from '@/model/Hashtag';
import { useQuery } from '@tanstack/react-query';

export default function TrendSection() {
  const { data } = useQuery<Hashtag[]>({
    queryKey: ['trends'],
    queryFn: getTrends,
    staleTime: 60 * 1000,
  });

  return data?.map((trend) => <Trend trend={trend} key={trend.tagId} />);
}
