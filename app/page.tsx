import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const Page = () => {
  redirect("/main/playlists");

  return <main></main>;
};

export default Page;
