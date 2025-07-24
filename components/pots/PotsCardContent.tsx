import Image from "next/image";
import { THEME_CLASSES } from "@/lib/constants";
import { Pot } from "types/pot";

interface Props {
  pots: Pot[];
}

export default async function PotsCardContent({ pots }: Props) {

  const total = pots.reduce((sum, pot) => sum + pot.saved, 0);

  return (
    <section className="flex flex-col 1570:flex-row gap-250">
      <div className={`w-full min-w-[247px] flex gap-250 bg-beige-100 p-250 w-fit rounded-[12px]`}>
        <Image src="/images/icon-pot.svg" alt="icon" width={28} height={35} className="ml-[2px]" />
        <div className="flex flex-col gap-[11px]">
          <p className="text-preset-4 text-grey-500">Total Saved</p>
          <p className="text-preset-1">${total}</p>
        </div>
      </div>
 
      <ul className="grid grid-cols-2 gap-y-200 gap-x-300 w-full">
        { pots.map(pot => {
            const themeColorClass = THEME_CLASSES[pot.theme] || 'bg-grey-300';
            return (
              <li key={pot._id} className={`flex gap-200 items-center w-full first:pt-0 last:pb-0 w-full`}>
                <span className={`h-[43px] min-w-[4px] rounded-full ${themeColorClass}`} />
                <div className={`flex flex-col justify-between items-center w-full items-start`}>
                  <span className={`text-preset-5 text-grey-500`}>{pot.name}</span>
                  <span className={`text-preset-4-bold`}>${pot.saved.toFixed(2)}</span>
                </div>
              </li>
            )
        }
        )}
      </ul>

    </section>
  );
}
