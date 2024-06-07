export const onTextAreaResizeHeight = (
  textAreaRef: React.RefObject<HTMLTextAreaElement>
) => {
  if (textAreaRef.current != null) {
    textAreaRef.current.style.height = "auto";
    return (textAreaRef.current.style.height =
      textAreaRef?.current?.scrollHeight + "px");
  }

  return null;
};
