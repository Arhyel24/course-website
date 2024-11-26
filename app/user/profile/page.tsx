import { getServerSession } from "next-auth";
import authOptions from "@/lib/AuthOptions";
import { redirect } from "next/navigation";
import ProfileComp from "./component";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const user = session?.user;

  return <ProfileComp user={user} />;
}
