import Home from "@/app/(afterLogin)/home/page";
import React from "react";

type Props = {
  params: {
    username: string;
    id: string;
    photoId: string;
  };
};

// 이미지를 클릭했을 때, 보이는 View
const page = ({ params }: Props) => {
  const { username, id, photoId } = params;

  return <Home />;
};

export default page;
