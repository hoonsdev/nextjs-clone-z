'use client';

import { signOut, useSession } from 'next-auth/react';
import style from './logoutButton.module.css';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  // const me = {
  //   // 임시로 내 정보 있는것처럼
  //   id: 'zerohch0',
  //   nickname: '제로초',
  //   image: '/5Udwvqim.jpg',
  // };

  const { data: me } = useSession();

  const router = useRouter();

  const onLogout = async () => {
    await signOut({ redirect: false });
    router.replace('/');
  };

  if (!me?.user) return null;

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.user?.image!} alt={me.user?.email as string} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  );
}
