import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mason McManus' Book Blog" },
    { name: "description", content: "Here are the books." },
  ];
}

export default function Home() {
  return <Welcome />;
}
