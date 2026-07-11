import Image from "next/image";
import { Tag } from "@/components/types";

export default function NftCard({
    src,
    name,
    tags,
    mintAmount,
}: {
    src: string;
    name: string;
    tags: Tag[];
    mintAmount: number;
}) {
    return (
        <div className="flex flex-col items-center px-[15px] py-[15px] gap-[10px] border-[1px] border-black max-w-[230px] h-fit">
            <Image src={src} alt="slash-nft" width="200" height="200" />
            <p className="text-black text-[16px] font-medium text-center">{name}</p>
            <p className="text-[#5A5A5A] text-[14px] font-medium mb-[10px]">{mintAmount} SOL</p>
            <div className="flex flex-row flex-wrap gap-[10px] w-full items-center justify-center">
                {tags.map((v, index) => {
                    if (v === "Dark") return (<div key={index} className="flex px-[12px] py-[7px] items-center justify-center bg-black"><p className="text-white text-[14px] font-medium text-center">Dark</p></div>);
                    if (v === "Light") return (<div key={index} className="flex px-[12px] py-[7px] items-center justify-center border-[1px] border-black"><p className="text-black text-[14px] font-medium text-center">Light</p></div>);
                    if (v === "Single" || v === "Double") return (<div key={index} className="flex px-[12px] py-[7px] items-center justify-center border-[1px] border-black"><p className="text-black text-[14px] font-medium text-center">{v === "Single" ? "Single /" : "Double //"}</p></div>);
                    if (v === "Common") return (<div key={index} className="flex px-[12px] py-[7px] items-center justify-center bg-[#969696]"><p className="text-white text-[14px] font-medium text-center">Common</p></div>);
                    if (v === "Rare") return (<div key={index} className="flex px-[12px] py-[7px] items-center justify-center bg-[#348FFF]"><p className="text-white text-[14px] font-medium text-center">Rare</p></div>);
                    if (v === "Legendary") return (<div key={index} className="flex px-[12px] py-[7px] items-center justify-center bg-[#FFC934]"><p className="text-white text-[14px] font-medium text-center">Legendary</p></div>);
                })}
            </div>
        </div>
    );
}
