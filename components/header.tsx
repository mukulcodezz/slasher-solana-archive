"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/collection", label: "Collections" },
    { href: "/doc", label: "Documents" },
    { href: "/roadmap", label: "Roadmap" },
];

export default function Header() {
    const pathname = usePathname();

    return (
        <div className="w-full flex flex-col gap-[20px] items-center justify-center justify-content-center pt-[50px] relative sm:flex-row">
            <a href="/">
                <Image
                    src="/images/logo.svg"
                    alt="logotype"
                    width="124"
                    height="22"
                    className="text-black"
                    style={{ color: "#000000" }}
                    loading="eager"
                />
            </a>
            <p className="text-[#5A5A5A] text-[14px] font-mediumr">{">"}</p>

            {navItems.map(({ href, label }) => {
                const isActive = pathname === href;

                return (
                    <Link
                        key={href}
                        href={href}
                        className={`text-[14px] font-medium hover:text-[#2C2C2C] hover:cursor-pointer ${
                            isActive
                                ? "text-black underline"
                                : "text-[#5A5A5A]"
                        }`}
                    >
                        {label}
                    </Link>
                );
            })}
        </div>
    );
}