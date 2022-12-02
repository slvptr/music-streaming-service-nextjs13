export const cutText = (text: string, maxLength: number) =>
  text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
