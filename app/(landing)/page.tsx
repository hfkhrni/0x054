import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start space-y-3 overflow-hidden pt-[12rem]">
      <h1 className="font-display text-[400px] leading-[350px]">X</h1>
      <Button className="rounded-sm font-mono text-2xl">
        TRY 0x54 FREE <ArrowRight className="ml-2" />
      </Button>
      <Button variant="secondary" className="rounded-sm font-mono text-base">
        LOG IN
      </Button>
    </main>
  );
}
