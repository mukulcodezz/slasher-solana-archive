export function DisclosurePanel({
  label,
  status,
  children,
}: {
  label: string;
  status: "Confirmed" | "Pending" | "Not applicable";
  children: React.ReactNode;
}) {
  return (
    <article className="disclosure-panel">
      <div><span>{label}</span><strong data-status={status}>{status}</strong></div>
      <p>{children}</p>
    </article>
  );
}
