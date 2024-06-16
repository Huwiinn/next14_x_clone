import { QueryFunction } from "@tanstack/react-query";
import { User } from "@/model/User";
import { cookies } from "next/headers";

const getUser: QueryFunction<User, [string, string]> = async ({ queryKey }) => {
  const [_1, username] = queryKey;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${username}`,
    {
      next: {
        tags: ["users", username],
      },
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("해당 유저 정보를 불러오지 못 했습니다.");
  }

  return res.json();
};

export default getUser;
