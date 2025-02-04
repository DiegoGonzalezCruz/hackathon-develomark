import Image from "next/image";
import { PropsWithChildren } from "react";

export interface ReportPageWrapperProps extends PropsWithChildren {
  title: string;
  subtitle: string;
}

export function ReportPageWrapper({
  title,
  subtitle,
  children,
}: ReportPageWrapperProps) {
  return (
    <div>
      <header className="bg-neutral-100 h-fit md:h-24 shadow-md sticky top-0  z-50">
        <div className="max-w-7xl w-full mx-auto p-5 md:py-6 flex flex-col md:flex-row items-center justify-start">
          <div className="row-span-2 flex items-center">
            <Image
              src="https://app.splashdash.ai/assets/icons/DudaExpert.svg"
              className="rounded-full size-8 outline outline-white shadow"
              alt="develomark"
              width={100}
              height={100}
            />
          </div>
          <div>
            <h2 className=" text-sm md:text-xl font-bold self-end">{title}</h2>
            <p className="text-sm font-semibold self-start">{subtitle}</p>
          </div>
        </div>
      </header>
      <div className="max-w-7xl w-full mx-auto px-4 pt-8 pb-24">{children}</div>
    </div>
  );
}
