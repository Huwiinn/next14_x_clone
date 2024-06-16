import style from "./profile.module.css";
import getUserPosts from "./_lib/getUserPosts";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import UserInfo from "./_component/UserInfo";
import UserPosts from "./_component/UserPosts";
import { getUserServer } from "./_lib/getUserServer";
import { auth } from "@/auth";
import { User } from "@/model/User";

type Props = {
  params: { id: string; username: string };
};

export async function generateMetadata({ params }: Props) {
  // console.log(1111, params);
  // console.log(2222, params.id);
  // console.log(3333, params.username);

  const user: User = await getUserServer({
    queryKey: ["users", params.username],
  });

  return {
    title: `${user.nickname} | ${user.id} X`,
    description: `${user.nickname} | ${user.id} 프로필`,
    openGraph: {
      title: `${user.nickname} | ${user.id} X`,
      description: `${user.nickname} | ${user.id} 프로필`,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}${user.image}`, // /upload
          width: 400,
          height: 400,
        },
      ],
    },
  };
}

export default async function Profile({ params }: Props) {
  const { username } = params;
  const session = await auth();
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUserServer,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
  });

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} session={session} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
