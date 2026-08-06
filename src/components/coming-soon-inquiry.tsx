"use client";

import { useRef, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ComingSoonInquiry() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/coming-soon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) throw new Error(result.message || "Unable to send your request.");

      form.reset();
      setStatus("success");
      setMessage("Thank you. Andrea will be in touch soon.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send your request.");
    }
  }

  function openDialog() {
    setStatus("idle");
    setMessage("");
    dialogRef.current?.showModal();
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="inline-flex min-h-14 items-center justify-center rounded-full bg-[var(--color-sand)] px-7 py-4 text-xs font-bold tracking-[0.22em] uppercase text-[var(--color-charcoal)] shadow-[0_18px_50px_rgba(0,0,0,0.2)] transition hover:-translate-y-0.5 hover:bg-[#efd9b8]"
      >
        Request More Information
      </button>

      <dialog
        ref={dialogRef}
        className="coming-soon-dialog m-auto w-[min(92vw,42rem)] max-w-none rounded-[1.75rem] border border-white/14 bg-[#171c24] p-0 text-white shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop:bg-[#080b10]/80 backdrop:backdrop-blur-sm"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="relative p-6 sm:p-9">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/16 text-lg text-white/70 transition hover:border-white/40 hover:text-white"
            aria-label="Close inquiry form"
          >
            ×
          </button>

          <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[var(--color-sand)]">Private inquiry</p>
          <h2 className="mt-4 max-w-xl font-serif text-4xl leading-[1.02] sm:text-5xl">Stay connected as the next chapter takes shape.</h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/64">Share your name and email. Andrea will follow up with more information about Alford Custom Builders.</p>

          {status === "success" ? (
            <div role="status" className="mt-8 rounded-[1.25rem] border border-[var(--color-sand)]/35 bg-[var(--color-sand)]/10 p-6">
              <p className="font-serif text-3xl text-[var(--color-sand)]">You&apos;re on the list.</p>
              <p className="mt-3 text-sm leading-7 text-white/72">{message}</p>
              <button type="button" onClick={() => dialogRef.current?.close()} className="mt-5 text-xs font-bold tracking-[0.2em] uppercase text-white underline underline-offset-4">Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-white/78">
                <span>First name</span>
                <input required autoComplete="given-name" name="firstName" className="rounded-xl border border-white/14 bg-white/7 px-4 py-3.5 text-white outline-none transition placeholder:text-white/30 focus:border-[var(--color-sand)]" />
              </label>
              <label className="grid gap-2 text-sm text-white/78">
                <span>Last name</span>
                <input required autoComplete="family-name" name="lastName" className="rounded-xl border border-white/14 bg-white/7 px-4 py-3.5 text-white outline-none transition placeholder:text-white/30 focus:border-[var(--color-sand)]" />
              </label>
              <label className="grid gap-2 text-sm text-white/78 sm:col-span-2">
                <span>Email</span>
                <input required type="email" autoComplete="email" name="email" placeholder="you@example.com" className="rounded-xl border border-white/14 bg-white/7 px-4 py-3.5 text-white outline-none transition placeholder:text-white/30 focus:border-[var(--color-sand)]" />
              </label>
              <label className="absolute -left-[10000px]" aria-hidden="true">
                <span>Company website</span>
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
              <div className="mt-2 sm:col-span-2">
                <button disabled={status === "submitting"} type="submit" className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-[var(--color-sand)] px-6 py-3 text-xs font-bold tracking-[0.22em] uppercase text-[var(--color-charcoal)] transition hover:bg-[#efd9b8] disabled:cursor-wait disabled:opacity-60">
                  {status === "submitting" ? "Sending…" : "Send My Information"}
                </button>
                {status === "error" ? <p role="alert" className="mt-4 text-sm text-[#f4b8ad]">{message}</p> : null}
                <p className="mt-4 text-center text-[11px] leading-5 text-white/42">Your information is sent privately to the Alford team and is not added to a public list.</p>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
