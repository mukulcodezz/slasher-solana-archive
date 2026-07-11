"use client";
import { useState, useMemo } from "react";
import Header from "@/components/header";
import LaunchMyNftEmbed from "@/components/launchmynft-embed";
import nfts from "@/components/nfts.json";
import NftCard from "@/components/nft-card";
import { Tag, INFTItem, ALL_TAGS } from "@/components/types";

function Button({ text, state, onClick }: { text: string; state: boolean; onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className={`flex px-[12px] py-[7px] hover:cursor-pointer transition-colors ${
                state ? "bg-black text-white" : "border-[1px] border-black text-black hover:bg-black hover:text-white"
            }`}
        >
            <p className={`text-[16px] font-medium text-center select-none`}>{text}</p>
        </div>
    );
}

export default function Collection() {
    const [activeTag, setActiveTag] = useState<Tag | "All">("All");

    const filtered = useMemo(() => {
        if (activeTag === "All") return nfts as INFTItem[];
        return (nfts as INFTItem[]).filter((nft) => nft.tags.includes(activeTag));
    }, [activeTag]);

    return (
        <div className="flex items-start w-screen max-w-[1440px] h-screen flex-col">
            <Header />

            <div className="flex w-full h-full pt-[80px] gap-[80px] mt-[80px] flex-col items-center justify-center mb-[80px]">
                <div className="flex flex-col items-center gap-[16px]">
                    <p className="text-black text-[40px] font-medium text-center">Collections</p>
                    <LaunchMyNftEmbed />
                </div>

                <div className="flex flex-col md:flex-row max-w-[1066px] w-full gap-[25px] md:gap-[63px] h-full justify-center w-fit">
                    <div className="flex flex-col px-[15px] items-center border-[1px] border-black h-fit py-[15px]">
                        <div className="flex flex-col gap-[10px] pt-[10px]">
                            <p className="text-black text-[16px] font-medium text-center">Filter by tags</p>
                            <div className="flex flex-row gap-[5px] flex-wrap max-w-[135px] w-full">
                                <Button text="All" state={activeTag === "All"} onClick={() => setActiveTag("All")} />
                                {ALL_TAGS.map((tag) => (
                                    <Button
                                        key={tag}
                                        text={tag === "Single" ? "Single /" : tag === "Double" ? "Double //" : tag}
                                        state={activeTag === tag}
                                        onClick={() => setActiveTag(tag)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row max-w-[770px] gap-[40px] flex-wrap">
                        {filtered.length === 0 && (
                            <p className="text-black text-[16px] opacity-40">Nothing to show</p>
                        )}
                        {filtered.map((v, k) => (
                            <NftCard
                                key={k}
                                src={v.image}
                                name={v.name}
                                tags={v.tags}
                                mintAmount={v.price}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
