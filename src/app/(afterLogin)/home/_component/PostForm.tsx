"use client";

import {
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  useRef,
  useState,
} from "react";
import styles from "./postForm.module.css";
import { useSession } from "next-auth/react";
import { Session } from "@auth/core/types";
import { onTextAreaResizeHeight } from "../../_lib/onTextAreaResizeHeight";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post as IPost } from "@/model/Post";

type Props = {
  me: Session | null;
};

export default function PostForm({ me }: Props) {
  const [content, setContent] = useState<string>("");
  const [previewImgs, setPreviewImgs] = useState<
    Array<{ dataUrl: string; file: File } | null>
  >([]);
  const imageRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (e: FormEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const formData = new FormData();
      formData.append("content", content);
      previewImgs.forEach((imgFile) => {
        imgFile && formData.append("images", imgFile?.file);
      });

      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
    },
    async onSuccess(response, variable) {
      const newPost = await response.json();

      setContent("");
      setPreviewImgs([]);

      if (queryClient.getQueryData(["posts", "recommends"])) {
        queryClient.setQueryData(
          ["posts", "recommends"],
          (prevData: { pages: IPost[][] }) => {
            const shallow = { ...prevData, pages: [...prevData.pages] };

            shallow.pages[0] = [...shallow.pages[0]];
            shallow.pages[0].unshift(newPost);

            return shallow;
          }
        );
      }

      if (queryClient.getQueryData(["posts", "followings"])) {
        queryClient.setQueryData(
          ["posts", "followings"],
          (prevData: { pages: IPost[][] }) => {
            const shallow = { ...prevData, pages: [...prevData.pages] };

            shallow.pages[0] = [...shallow.pages[0]];
            shallow.pages[0].unshift(newPost);

            return shallow;
          }
        );
      }
    },
    onError(error) {
      console.log("Post Submit error : ", error);
      alert("Post Submit error");
      //     // 이 부분 toastUI 적용해서 에러 띄워보기
    },
  });

  // const { data: me } = useSession(); // 클라이언트에서만 사용가능. 유저 정보를 불러온다.

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setContent(e.target.value);
  };

  // const onSubmit: FormEventHandler = async (e: FormEvent<Element>) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("content", content);
  //   previewImgs.forEach((imgFile) => {
  //     imgFile && formData.append("images", imgFile?.file);
  //   });

  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`,
  //       {
  //         method: "POST",
  //         credentials: "include",
  //         body: formData,
  //       }
  //     );

  //     if (response.status === 201) {
  //       setContent("");
  //       setPreviewImgs([]);

  //       const newPost = await response.json();

  //       queryClient.setQueryData(
  //         ["posts", "recommends"],
  //         (prevData: { pages: IPost[][] }) => {
  //           const shallow = { ...prevData, pages: [...prevData.pages] };

  //           shallow.pages[0] = [...shallow.pages[0]];
  //           shallow.pages[0].unshift(newPost);

  //           return shallow;
  //         }
  //       );
  //       queryClient.setQueryData(
  //         ["posts", "followings"],
  //         (prevData: { pages: IPost[][] }) => {
  //           const shallow = { ...prevData, pages: [...prevData.pages] };

  //           shallow.pages[0] = [...shallow.pages[0]];
  //           shallow.pages[0].unshift(newPost);

  //           return shallow;
  //         }
  //       );
  //     }
  //   } catch (error) {
  //     console.log("Post Submit error : ", error);
  //     // 이 부분 toastUI 적용해서 에러 띄워보기
  //   }
  // };

  const onClickButton = () => {
    imageRef.current?.click();
  };

  const onUploadImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();

    // e.target.files : 파일 배열

    if (e.target.files) {
      Array.from(e.target.files).forEach((file, index) => {
        const reader = new FileReader();
        // 2. 이벤트 트리거가 되어 내부 콜백함수 실행.
        reader.onloadend = () => {
          setPreviewImgs((previewImg) => {
            const prev = [...previewImg];
            prev[index] = { dataUrl: reader.result as string, file };
            return prev;
          });
        };
        // 1. 파일을 읽고
        reader.readAsDataURL(file); // 이 과정을 거치면 무조건 string 타입으로 나옴
        // dataURL은 이미지데이터를 문자열로 나타낸 것. img src에 사용할 수 있다.
      });
    }
  };

  const onRemoveImage = (idx: number) => {
    setPreviewImgs((prevPriviews) => {
      // 여기서 얇은 복사를 하는 이유를 gpt에게 물어보고 혼자서도 알아보기 (무조건)
      const prev = [...prevPriviews];
      prev[idx] = null;
      return prev;
    });
  };

  return (
    <form className={styles.postForm} onSubmit={mutation.mutate}>
      <div className={styles.postUserSection}>
        <div className={styles.postUserImage}>
          <img src={me?.user?.image as string} alt={me?.user?.id as string} />
        </div>
      </div>
      <div className={styles.postInputSection}>
        <textarea
          value={content}
          onChange={(e) => {
            onChange(e);
            onTextAreaResizeHeight(textAreaRef);
          }}
          placeholder="무슨 일이 일어나고 있나요?"
          ref={textAreaRef}
        />

        <div className={styles.previewWrap}>
          {previewImgs.map((image, idx) => {
            return (
              image && (
                <div
                  key={idx}
                  onClick={() => onRemoveImage(idx)}
                  className={styles.previewImg}>
                  <img key={idx} src={image.dataUrl} alt="이미지 미리보기" />
                </div>
              )
            );
          })}
        </div>

        <div className={styles.postButtonSection}>
          <div className={styles.footerButtons}>
            <div className={styles.footerButtonLeft}>
              <input
                type="file"
                name="imageFiles"
                multiple
                hidden
                ref={imageRef}
                onChange={onUploadImage}
              />
              <button
                title="이미지 추가 버튼"
                className={styles.uploadButton}
                type="button"
                onClick={onClickButton}>
                <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                  </g>
                </svg>
              </button>
            </div>
            <button className={styles.actionButton} disabled={!content}>
              게시하기
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
