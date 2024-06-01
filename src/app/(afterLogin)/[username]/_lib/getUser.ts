import { QueryFunction } from "@tanstack/react-query";
import { User } from "@/model/User";

const getUser: QueryFunction<User, [string, string]> = async ({ queryKey }) => {
  const [_1, username] = queryKey;

  const res = await fetch(`http://localhost:9090/api/users/${username}`, {
    next: {
      tags: ["users", username],
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("해당 유저 정보를 불러오지 못 했습니다.");
  }

  return res.json();
};

export default getUser;
