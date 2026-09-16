"use client";

import { useState } from "react";

import { siteConfig } from "@/lib/site-data";

const projectTypes = ["Custom Build", "Remodel / Addition", "Other"];
const contactMethods = ["Email", "Phone", "Text message"];
const propertyOptions = ["Yes", "No", "Currently Looking"];
const planOptions = ["Yes", "In Progress", "Not Yet"];

const fieldClassName =
  "acb-form__field rounded-none border-0 border-b border-[rgba(242,224,209,0.34)] bg-transparent px-0 py-3 text-white outline-none transition placeholder:text-white/36 focus:border-[var(--brand-apricot)]";

export function LeadForm() {
  const [status, setStatus] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    const payload = Object.fromEntries(formData.entries());
    const subject = `Project inquiry from ${payload.name || "website visitor"}`;
    const body = [
      `Name: ${payload.name || ""}`,
      `Email: ${payload.email || ""}`,
      `Phone: ${payload.phone || ""}`,
      `Preferred method of contact: ${payload.preferredContact || ""}`,
      `Project type: ${payload.projectType || ""}`,
      `Project location: ${payload.projectLocation || ""}`,
      `Owns property: ${payload.ownsProperty || ""}`,
      `Architectural plans: ${payload.architecturalPlans || ""}`,
      `Desired timeline: ${payload.timeline || ""}`,
      `Estimated investment range: ${payload.investment || ""}`,
      "",
      "Vision:",
      `${payload.vision || ""}`,
    ].join("\n");

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("Your email app should open with your project details filled in.");
  }

  return (
    <form action={handleSubmit} className="acb-form">
      <div className="acb-form__grid">
        <label>
          <span>Name</span>
          <input required name="name" autoComplete="name" className={fieldClassName} placeholder="Your name" />
        </label>
        <label>
          <span>Email</span>
          <input required type="email" name="email" autoComplete="email" className={fieldClassName} placeholder="you@example.com" />
        </label>
        <label>
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" className={fieldClassName} placeholder="Your phone number" />
        </label>
        <label>
          <span>Preferred Method of Contact</span>
          <select name="preferredContact" className={fieldClassName} defaultValue="">
            <option value="" disabled>Select one</option>
            {contactMethods.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label>
          <span>Project Type</span>
          <select name="projectType" className={fieldClassName} defaultValue="">
            <option value="" disabled>Select one</option>
            {projectTypes.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label>
          <span>Project Location</span>
          <input name="projectLocation" className={fieldClassName} placeholder="City or neighborhood" />
        </label>
        <label>
          <span>Do You Currently Own the Property?</span>
          <select name="ownsProperty" className={fieldClassName} defaultValue="">
            <option value="" disabled>Select one</option>
            {propertyOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label>
          <span>Do You Have Architectural Plans?</span>
          <select name="architecturalPlans" className={fieldClassName} defaultValue="">
            <option value="" disabled>Select one</option>
            {planOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label>
          <span>Desired Timeline</span>
          <input name="timeline" className={fieldClassName} placeholder="When would you like to begin?" />
        </label>
        <label>
          <span>Estimated Investment Range</span>
          <input name="investment" className={fieldClassName} placeholder="Share a range if you have one" />
        </label>
        <label className="sm:col-span-2">
          <span>Tell Us About Your Vision</span>
          <textarea
            required
            name="vision"
            rows={5}
            className={fieldClassName}
            placeholder="Share anything that would help us understand what you are considering."
          />
        </label>
      </div>

      <div className="acb-form__submit">
        <p>You do not have to have every answer yet.</p>
        <button type="submit">
          <span>Start the Conversation</span>
          <span aria-hidden="true">↗</span>
        </button>
      </div>

      {status ? <p role="status" className="acb-form__status">{status}</p> : null}
    </form>
  );
}
