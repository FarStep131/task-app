import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <p className="text-orange-500 font-bold text-5xl">Hello World</p>
      <Button className="my-5" variant="outline">
        Click
      </Button>
    </main>
  );
}
