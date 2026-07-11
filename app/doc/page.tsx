"use client";
import { useState } from "react";
import Header from "@/components/header";

const DOCS = {
    "Terms of Service": `
**Last updated: July 2026**

Welcome to Slash NFT. By accessing or using our platform, you agree to be bound by these Terms of Service.

**1. Eligibility**
You must be at least 18 years old to use Slash NFT. By using the platform, you confirm that you meet this requirement and that you are legally permitted to engage in NFT transactions in your jurisdiction.

**2. NFT Minting**
When you mint an NFT through our platform, you receive a unique digital asset on the Solana blockchain. Minting is final and irreversible. All transactions are conducted in SOL. Gas fees and network fees are your responsibility.

**3. Wallet & Security**
You are solely responsible for the security of your connected wallet (e.g. Phantom). Slash NFT does not store private keys, seed phrases, or wallet credentials. We are not liable for any losses resulting from unauthorized wallet access.

**4. Intellectual Property**
Each NFT in the Slash collection grants you personal, non-commercial display rights to the associated artwork. You do not acquire copyright or trademark rights. Commercial use, reproduction, or redistribution of the artwork without written consent is prohibited.

**5. No Guarantees**
NFTs are speculative digital assets. We make no representations regarding the future value, liquidity, or utility of any NFT minted through our platform. Past performance is not indicative of future results.

**6. Prohibited Conduct**
You agree not to use the platform for money laundering, fraud, market manipulation, or any activity that violates applicable law. We reserve the right to block access to wallets engaged in prohibited conduct.

**7. Platform Availability**
We do not guarantee uninterrupted access to the platform. We may pause minting, update smart contracts, or discontinue services at any time with reasonable notice where possible.

**8. Limitation of Liability**
To the maximum extent permitted by law, Slash NFT and its contributors shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.

**9. Governing Law**
These terms are governed by the laws of the jurisdiction in which Slash NFT is registered. Disputes shall be resolved through binding arbitration.

**10. Changes to Terms**
We may update these terms at any time. Continued use of the platform after changes constitutes your acceptance of the updated terms.
  `.trim(),

    "Privacy Policy": `
**Last updated: July 2026**

Slash NFT is committed to protecting your privacy. This policy explains what data we collect, how we use it, and your rights.

**1. Data We Collect**
We collect minimal data necessary to operate the platform:
- Wallet address (public key) when you connect your wallet
- Transaction data recorded on the Solana blockchain (public by nature)
- Basic usage analytics (pages visited, interactions) — anonymized
- Device and browser type for performance monitoring

We do not collect your name, email, or any personally identifiable information unless you voluntarily provide it (e.g. via a contact form).

**2. Blockchain Data**
All minting transactions are recorded on the Solana blockchain and are publicly visible by design. This is inherent to how blockchain technology works and is outside our control.

**3. How We Use Data**
- To process NFT minting requests
- To display your minted NFTs in our collection viewer
- To improve platform performance and user experience
- To detect and prevent fraudulent activity

**4. Third-Party Services**
We use the following third-party services:
- **Solana RPC providers** — to broadcast transactions
- **Phantom Wallet** — connection handled entirely client-side; we never see your private key
- **Analytics** — anonymized, aggregated data only

We do not sell your data to third parties.

**5. Cookies**
We use only essential cookies required for the platform to function. No tracking cookies or advertising cookies are used.

**6. Data Retention**
We do not retain wallet addresses or transaction data beyond what is already publicly available on-chain. Anonymized analytics may be retained for up to 12 months.

**7. Your Rights**
Depending on your jurisdiction, you may have the right to access, correct, or request deletion of any personal data we hold. Since we collect minimal data, most requests can be fulfilled immediately. Contact us to exercise your rights.

**8. Security**
We implement industry-standard security practices. However, no system is completely secure. We encourage you to protect your wallet and never share your seed phrase with anyone — including us.

**9. Children**
Our platform is not intended for users under 18. We do not knowingly collect data from minors.

**10. Contact**
If you have any questions about this policy, please reach out through our official channels.
  `.trim(),
};

type DocKey = keyof typeof DOCS;

function renderContent(text: string) {
    return text.split("\n\n").map((block, i) => {
        if (block.startsWith("**") && block.endsWith("**") && !block.slice(2).includes("**")) {
            return <p key={i} className="text-black text-[16px] font-bold mt-[24px] mb-[4px]">{block.replace(/\*\*/g, "")}</p>;
        }
        const parts = block.split(/(\*\*.*?\*\*)/g).map((part, j) =>
            part.startsWith("**") && part.endsWith("**")
                ? <strong key={j}>{part.replace(/\*\*/g, "")}</strong>
                : part
        );
        if (block.startsWith("- ")) {
            const items = block.split("\n").filter(l => l.startsWith("- "));
            return (
                <ul key={i} className="list-disc pl-[20px] mb-[12px]">
                    {items.map((item, j) => {
                        const itemParts = item.slice(2).split(/(\*\*.*?\*\*)/g).map((part, k) =>
                            part.startsWith("**") && part.endsWith("**")
                                ? <strong key={k}>{part.replace(/\*\*/g, "")}</strong>
                                : part
                        );
                        return <li key={j} className="text-[16px] text-black mb-[4px]">{itemParts}</li>;
                    })}
                </ul>
            );
        }
        return <p key={i} className="text-[16px] text-black mb-[12px] leading-[1.7]">{parts}</p>;
    });
}

function Button({ text, isActive, onClick }: { text: string; isActive: boolean; onClick: () => void }) {
    return (
        <p
            onClick={onClick}
            className={`text-[18px] font-medium hover:cursor-pointer transition-all whitespace-nowrap ${
                isActive ? "text-black underline" : "text-[#5A5A5A] hover:text-black"
            }`}
        >
            {text}
        </p>
    );
}

export default function Doc() {
    const [active, setActive] = useState<DocKey>("Terms of Service");

    return (
        <div className="flex items-start w-screen max-w-[1440px] min-h-screen flex-col">
            <Header />

            <div className="flex w-full flex-col items-center px-[20px] md:px-[40px] pb-[80px]" style={{ paddingTop: "calc(80px)" }}>
                <p className="text-black text-[40px] font-medium text-center mb-[60px]">Documents</p>

                <div className="flex flex-col md:flex-row max-w-[1066px] w-full gap-[30px] md:gap-[63px]">

                    <div className="flex flex-row md:flex-col gap-[16px] md:gap-[20px] w-full md:w-fit h-fit md:mb-[20px] md:mr-[20px] flex-shrink-0">
                        {(Object.keys(DOCS) as DocKey[]).map((key) => (
                            <Button key={key} text={key} isActive={active === key} onClick={() => setActive(key)} />
                        ))}
                    </div>

                    <div className="w-full">
                        {renderContent(DOCS[active])}
                    </div>

                </div>
            </div>
        </div>
    );
}