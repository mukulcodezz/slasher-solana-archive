"use client";
import Header from "@/components/header";

type Status = "done" | "progress" | "upcoming" | "planned";

interface RoadmapItem {
    quarter: string;
    title: string;
    description: string;
    status: Status;
}

const items: RoadmapItem[] = [
    { quarter: "Q2", title: "Launch Solana NFTs", description: "Mint the-slasher collection.", status: "progress" },
    { quarter: "Q2", title: "Listing on markets", description: "Placement on Magic Eden and Tensor. Collection verification.", status: "upcoming" },
    { quarter: "Q3", title: "Add staking mechanism", description: "Holders will be able to stake NFT and receive $SLASH tokens.", status: "planned" },
    { quarter: "Q3", title: "Token generation event", description: "Launching the $SLASH token. Airdrop to holders by snapshot.", status: "planned" },
    { quarter: "Q4", title: "DAO governance", description: "Voting for the development of the project through a token. The first propositions from the community.", status: "planned" },
];

const statusLabel: Record<Status, string> = {
    done: "Completed",
    progress: "In progress",
    upcoming: "Upcoming",
    planned: "Planned",
};

function TimelineItem({ item, isLast }: { item: RoadmapItem; isLast: boolean }) {
    const isDone = item.status === "done";

    return (
        <div className="flex gap-0">
            <div className="flex flex-col items-center w-[56px] flex-shrink-0">
                <div className={`w-[10px] h-[10px] rounded-full mt-[4px] flex-shrink-0 ${
                    isDone ? "bg-black" : "border-[1.5px] border-black bg-white"
                }`} />
                {!isLast && <div className="w-[1px] flex-1 bg-black min-h-[32px] mt-[4px]" />}
                <p className="text-[11px] font-medium text-[#5A5A5A] mt-[4px]">{item.quarter}</p>
            </div>

            <div className={`pl-[12px] ${isLast ? "pb-0" : "pb-[32px]"}`}>
                <p className="text-black text-[18px] font-medium leading-[1.4]">{item.title}</p>
                <p className="text-[14px] text-[#5A5A5A] mt-[4px] leading-[1.5]">{item.description}</p>
                <div className={`inline-block mt-[8px] px-[10px] py-[2px] text-[11px] font-medium ${
                    isDone
                        ? "bg-black text-white"
                        : "border-[1px] border-black text-black"
                }`}>
                    {statusLabel[item.status]}
                </div>
            </div>
        </div>
    );
}

export default function Roadmap() {
    return (
        <div className="flex items-start w-screen max-w-[1440px] min-h-screen flex-col">
            <Header />

            <div className="flex w-full flex-col items-center px-[20px] md:px-[40px] pb-[80px]"
                 style={{ paddingTop: "calc(80px)" }}>
                <p className="text-black text-[40px] font-medium text-center mb-[60px]">Roadmap</p>

                <div className="w-full max-w-[560px]">
                    {items.map((item, i) => (
                        <TimelineItem key={i} item={item} isLast={i === items.length - 1} />
                    ))}
                </div>
            </div>
        </div>
    );
}