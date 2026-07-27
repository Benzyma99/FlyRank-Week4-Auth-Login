import { AuthPage } from "./components/auth-page";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <AuthPage />
    </div>
  );
}
