"use client";

import { useState } from "react";

import { siteConfig } from "@/lib/site-data";

const projectTypes = [
  "Custom Home",
  "Remodel",
  "Addition",
  "Pre-Construction Planning",
];

const timelineOptions = [
  "Immediately",
  "3-6 months",
  "6-12 months",
  "12+ months",
];

const budgetOptions = [
  "Under $1M",
  "$1M-$2M",
  "$2M-$4M",
  "$4M+",
];

export function LeadForm() {
  const [status, setStatus] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    const payload = Object.fromEntries(formData.entries());
    const subject = `Project inquiry from ${payload.name || "website visitor"}`;
    const body = [
      `Name: ${payload.name || ""}`,
      `Email: ${payload.email || ""}`,
      `Phone: ${payload.phone || ""}`,
      `Project type: ${payload.projectType || ""}`,
      `Project location: ${payload.projectLocation || ""}`,
      `Estimated timeline: ${payload.timeline || ""}`,
      `Budget range: ${payload.budget || ""}`,
      "",
      "Message:",
      `${payload.message || ""}`,
    ].join("\n");

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("Your email app should open with the inquiry details filled in.");
  }

  return (
    <div className="rounded-[2rem] border border-white/12 bg-[rgba(13,21,31,0.72)] p-6 shadow-[0_30px_80px_rgba(4,8,12,0.28)] backdrop-blur-md sm:p-8">
      <div className="max-w-xl">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-sand)]">
          Start The Conversation
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl">
          Tell us about the home you want to create.
        </h2>
        <p className="mt-4 text-sm leading-7 text-white/72 sm:text-base">
          Inquiries go directly to Ben Alford. Share the basics and we will
          follow up with a thoughtful next step.
        </p>
      </div>

      <form action={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-white/84">
          <span>Name</span>
          <input
            required
            name="name"
            className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-[var(--color-sand)]"
            placeholder="Your name"
          />
        </label>
        <label className="grid gap-2 text-sm text-white/84">
          <span>Email</span>
          <input
            required
            type="email"
            name="email"
            className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-[var(--color-sand)]"
            placeholder="you@example.com"
          />
        </label>
        <label className="grid gap-2 text-sm text-white/84">
          <span>Phone</span>
          <input
            name="phone"
            className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-[var(--color-sand)]"
            placeholder="(214) 555-0199"
          />
        </label>
        <label className="grid gap-2 text-sm text-white/84">
          <span>Project Type</span>
          <select
            name="projectType"
            className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3 text-white outline-none transition focus:border-[var(--color-sand)]"
            defaultValue=""
          >
            <option value="" disabled className="text-[var(--color-charcoal)]">
              Select one
            </option>
            {projectTypes.map((option) => (
              <option key={option} value={option} className="text-[var(--color-charcoal)]">
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm text-white/84">
          <span>Project Location</span>
          <input
            name="projectLocation"
            className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-[var(--color-sand)]"
            placeholder="Preston Hollow, Dallas"
          />
        </label>
        <label className="grid gap-2 text-sm text-white/84">
          <span>Estimated Timeline</span>
          <select
            name="timeline"
            className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3 text-white outline-none transition focus:border-[var(--color-sand)]"
            defaultValue=""
          >
            <option value="" disabled className="text-[var(--color-charcoal)]">
              Select one
            </option>
            {timelineOptions.map((option) => (
              <option key={option} value={option} className="text-[var(--color-charcoal)]">
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm text-white/84">
          <span>Budget Range</span>
          <select
            name="budget"
            className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3 text-white outline-none transition focus:border-[var(--color-sand)]"
            defaultValue=""
          >
            <option value="" disabled className="text-[var(--color-charcoal)]">
              Select one
            </option>
            {budgetOptions.map((option) => (
              <option key={option} value={option} className="text-[var(--color-charcoal)]">
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm text-white/84 sm:col-span-2">
          <span>Message</span>
          <textarea
            required
            name="message"
            rows={5}
            className="rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-[var(--color-sand)]"
            placeholder="Tell us about your home, goals, and where you are in the planning process."
          />
        </label>

        <div className="sm:col-span-2 flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm leading-7 text-white/64">
            Private inquiries only. No mass assignment. No handoff to a sales queue.
          </div>
          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center rounded-[0.95rem] bg-[var(--color-sand)] px-6 py-3 text-xs font-semibold tracking-[0.24em] uppercase text-[var(--color-charcoal)] transition hover:-translate-y-0.5 hover:bg-[#e7cfb0]"
          >
            Start the Conversation
          </button>
        </div>
      </form>

      {status ? <p className="mt-4 text-sm text-[var(--color-sand)]">{status}</p> : null}
    </div>
  );
}
