"use server";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

const onSubmit = async (prevState: any, formData: FormData) => {
  console.log("--------formData : ", formData);

  // formData의 검증
  if (!formData.get("id") || !(formData.get("id") as string)?.trim()) {
    return { message: "no_id" };
  }
  if (!formData.get("name") || !(formData.get("name") as string)?.trim()) {
    return { message: "no_name" };
  }
  if (
    !formData.get("password") ||
    !(formData.get("password") as string)?.trim()
  ) {
    return { message: "no_password" };
  }
  if (!formData.get("image")) {
    return { message: "no_image" };
  }

  let shouldRedirect = false;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      {
        method: "post",
        body: formData,
        credentials: "include", // 이 속성이 있어야 쿠키가 전달된다.
      }
    );

    console.log("response.status : ", response.status);
    if (response.status === 403) {
      const message = { message: "user_exists" };
      return message;
    }

    console.log("response Json : ", await response.json());
    shouldRedirect = true;

    await signIn("credentials", {
      username: formData.get("id"),
      password: formData.get("password"),
      redirect: false,
    });
  } catch (err) {
    return console.log("회원가입 에러 : ", err);
  }

  if (shouldRedirect) {
    redirect("/home"); // try-catch 안에서 x
  }
};

export default onSubmit;
