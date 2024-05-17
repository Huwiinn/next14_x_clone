"use client";

import style from "./signup.module.css";
import BackBtn from "./BackBtn";
import onSubmit from "../_lib/signup";
import { useFormState, useFormStatus } from "react-dom";

const showMessage = (message: string | undefined) => {
  if (message === "no_id") {
    return "아이디가 없습니다.";
  }
  if (message === "no_name") {
    return "이름이 없습니다. 다시 확인해주세요.";
  }
  if (message === "password") {
    return "비밀번호가 없습니다. 확인해주세요.";
  }
  if (message === "no_image") {
    return "사진을 넣어주세요.";
  }

  return "";
};

export default function SignupModal() {
  const [state, formAction] = useFormState(onSubmit, { message: "common" });
  const { pending } = useFormStatus();

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <BackBtn />
            <div>계정을 생성하세요.</div>
          </div>
          <form action={formAction} method="">
            <div className={style.modalBody}>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="id">
                  아이디
                </label>
                <input
                  id="id"
                  name="id"
                  className={style.input}
                  type="text"
                  placeholder="아이디를 입력해주세요."
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="name">
                  닉네임
                </label>
                <input
                  id="name"
                  name="name"
                  className={style.input}
                  type="text"
                  placeholder="이름을 입력해주세요."
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="password">
                  비밀번호
                </label>
                <input
                  id="password"
                  name="password"
                  className={style.input}
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  required
                />
              </div>
              <div className={style.inputDiv}>
                <label className={style.inputLabel} htmlFor="image">
                  프로필
                </label>
                <input
                  id="image"
                  name="image"
                  className={style.input}
                  type="file"
                  accept="image/*"
                  required
                />
              </div>
            </div>
            <div className={style.modalFooter}>
              <button
                type="submit"
                className={style.actionButton}
                disabled={pending}>
                가입하기
              </button>
              <div className={style.error}>{showMessage(state?.message)}</div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
