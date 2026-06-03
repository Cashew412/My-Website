"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import { person } from "@/lib/content";

type Errors = { name?: string; email?: string; message?: string };

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function validate(): Errors {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email.";
    if (form.message.trim().length < 10) e.message = "A little more detail helps (10+ characters).";
    return e;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company || "—"}\n\n${form.message}`
    );
    window.location.href = `mailto:${person.contactEmail}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const field =
    "w-full rounded-xl border border-border bg-elevated px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <input
            id="name"
            className={field}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            aria-invalid={!!errors.name}
          />
          {errors.name && <span className="text-xs text-negative">{errors.name}</span>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            className={field}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
            aria-invalid={!!errors.email}
          />
          {errors.email && <span className="text-xs text-negative">{errors.email}</span>}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="company" className="text-sm font-medium">Company <span className="text-faint">(optional)</span></label>
        <input
          id="company"
          className={field}
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          placeholder="Where you work"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium">Message</label>
        <textarea
          id="message"
          rows={5}
          className={`${field} resize-none`}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="What problem are you trying to solve?"
          aria-invalid={!!errors.message}
        />
        {errors.message && <span className="text-xs text-negative">{errors.message}</span>}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-primary">
          <Icon name="mail" size={16} /> Send message
        </button>
        {sent && (
          <span className="inline-flex items-center gap-1.5 text-sm text-positive">
            <Icon name="check" size={15} /> Opening your email client…
          </span>
        )}
      </div>
      <p className="text-xs text-faint">
        This opens your email app with the message pre-filled. Prefer direct?{" "}
        <a href={`mailto:${person.contactEmail}`} className="font-semibold text-brand">{person.contactEmail}</a>
      </p>
    </form>
  );
}
