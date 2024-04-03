import { http, HttpResponse } from 'msw';

export const handlers = [
  // mock server 응답 설정
  // 로그인
  http.post('/api/login', () => {
    return HttpResponse.json(
      {
        userId: 1,
        nickname: '태훈',
        id: 'hoons',
        image: '5Udwvqim.jpg',
      },
      {
        headers: {
          'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/',
        },
      }
    );
  }),
  // 로그아웃
  http.post('/api/logout', () => {
    return new HttpResponse(null, {
      headers: {
        'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0',
      },
    });
  }),
];
