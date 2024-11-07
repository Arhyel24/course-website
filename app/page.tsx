import Dashboard from "@/components/dashboard";
import { MyFooter } from "@/components/footer";
import { NavBar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <NavBar />
      <Dashboard />
      <MyFooter />
    </>
  );
}
