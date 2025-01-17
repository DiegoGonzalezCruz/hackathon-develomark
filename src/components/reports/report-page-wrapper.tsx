import { PropsWithChildren } from "react";

export namespace ReportPageWrapper {
  export type Props = PropsWithChildren<{
    title: string,
    subtitle: string
  }>
}

export function ReportPageWrapper({ title, subtitle, children }: ReportPageWrapper.Props) {

  return (
    <div>
      <header className="bg-neutral-100 h-24 shadow-md sticky top-0">
        <div className="max-w-7xl w-full mx-auto px-4 py-6 grid grid-cols-[auto,1fr] grid-rows-[1.5fr,1fr] gap-x-4">
          <div className="row-span-2 flex items-center">
            <img src="https://app.splashdash.ai/assets/icons/DudaExpert.svg" className="rounded-full size-8 outline outline-white shadow" />
          </div>
          <h2 className="text-xl font-bold self-end">{title}</h2>
          <p className="text-sm font-semibold self-start">{subtitle}</p>
        </div>
      </header>
      <div className="max-w-7xl w-full mx-auto px-4 pt-8 pb-24">
        {children}
      </div>
    </div>
  );
}