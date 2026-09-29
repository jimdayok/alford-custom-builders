import Image from "next/image";

export function StatementBand({ statement }: { statement: React.ReactNode }) {
  return (
    <aside className="acb-statement" aria-label="Alford brand standard">
      <div className="acb-shell acb-statement__inner">
        <Image
          src="/brand/web/icon-apricot.svg"
          alt=""
          width={58}
          height={58}
          className="acb-statement__icon"
        />
        <p>{statement}</p>
        <span aria-hidden="true" className="acb-statement__rule" />
      </div>
    </aside>
  );
}
