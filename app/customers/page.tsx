import { Metadata } from "next";
import Image from "next/image";

import { cn } from "@/lib/utils";


import { DemoCreateAccount } from "@/components/customers/create-account";

import { DemoShareDocument } from "@/components/customers/share-document";

import { MainNav } from "@/components/main-nav";

export const metadata: Metadata = {
  title: "Cards",
  description: "Examples of cards built using the components.",
};

function DemoContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
        className
      )}
      {...props}
    />
  );
}

export default function CardsPage() {
  return (
    <>
      <div className="flex pt-5 items-center px-4">
        <MainNav className="mx-6" />
      </div>

      <div className="md:hidden">
        <Image
          src="/examples/cards-light.png"
          width={1280}
          height={1214}
          alt="Cards"
          className="block dark:hidden"
        />
        <Image
          src="/examples/cards-dark.png"
          width={1280}
          height={1214}
          alt="Cards"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-2">
        <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
          <DemoContainer>
            <DemoCreateAccount />
          </DemoContainer>
        </div>
        <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
          
          <DemoContainer>
            <DemoShareDocument />
          </DemoContainer>
        </div>
      </div>
    </>
  );
}
