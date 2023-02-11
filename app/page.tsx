import { redirect } from "next/navigation";

const Page = () => {
  redirect("/main/playlists");

  return <main></main>;
};

export default Page;
