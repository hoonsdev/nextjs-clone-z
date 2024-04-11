export async function getPostRecommends() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/postRecommends`,
    {
      // 기본적으로 fetching 시에 데이터를 저장함. -> 캐시
      // 다른 사람이 똑같은 데이터를 불러올 때 이 캐시 데이터를 사용
      // 캐시가 너무 강력하게 설정되어 있으면 새로운 데이터를 받아올 수 없음. 이 때 업데이트 쳐주는 키가 tags(캐시 초기화를 위한 key)
      next: {
        tags: ['posts', 'recommends'],
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
