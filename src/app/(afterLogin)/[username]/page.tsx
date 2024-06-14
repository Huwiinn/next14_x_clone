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
  console.log(1111, params);
  console.log(2222, params.id);
  console.log(3333, params.username);
  const user: User = await getUserServer({
    queryKey: ["users", params.username],
  });

  return {
    title: `나의 X 프로필`,
    description: `나의 X 상세정보`,
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
