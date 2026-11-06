"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";

type Field = "name" | "email" | "phone" | "date" | "guests" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+()\d\s-]{10,20}$/;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const phone = String(data.get("phone") ?? "").trim();
  const date = String(data.get("date") ?? "");
  const guests = String(data.get("guests") ?? "");
  const message = String(data.get("message") ?? "").trim();

  if (name.length < 2) errors.name = "Enter your name.";
  if (!EMAIL_PATTERN.test(email)) errors.email = "Enter an email address like name@example.com.";
  if (phone && !PHONE_PATTERN.test(phone)) errors.phone = "Enter a UK phone number, or leave this empty.";

  if (!date) {
    errors.date = "Choose a date for your visit.";
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const chosen = new Date(`${date}T00:00:00`);
    if (chosen < today) errors.date = "Choose today or a date in the future.";
    else if (chosen.getDay() === 1) errors.date = "We are closed on Mondays. Choose another day.";
  }

  if (!guests) errors.guests = "Choose how many guests.";
  if (message.length > 500) errors.message = "Keep your message under 500 characters.";

  return errors;
}

const inputClass =
  "mt-2 block w-full rounded-sm border bg-white/70 px-4 py-3 text-base text-charcoal placeholder:text-ink-muted/70 transition-colors focus:border-charcoal focus:outline-none focus-visible:outline-2 focus-visible:outline-terracotta";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 text-sm text-terracotta-dark">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sentTo, setSentTo] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors = validate(data);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0] as Field | undefined;
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setSentTo(String(data.get("name")).trim().split(" ")[0]);
    form.reset();
  }

  // Move keyboard and screen-reader focus to the confirmation once it renders.
  useEffect(() => {
    if (sentTo) successRef.current?.focus();
  }, [sentTo]);

  function clearError(field: Field) {
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  }

  const describedBy = (field: Field, hint?: string) =>
    [hint, errors[field] ? `${field}-error` : null].filter(Boolean).join(" ") || undefined;

  const border = (field: Field) => (errors[field] ? "border-terracotta-dark" : "border-charcoal/20");

  if (sentTo) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-sm border border-olive/60 bg-white/60 p-8 focus:outline-none"
      >
        <CheckCircle2 className="size-8 text-olive-deep" strokeWidth={1.5} aria-hidden="true" />
        <h3 className="mt-4 font-serif text-3xl">Thank you, {sentTo}</h3>
        <p className="mt-3 leading-relaxed text-ink-muted">
          Your request looks good. This is a demo website, so nothing has been sent and no table is reserved. For a real
          restaurant, this is where the booking would be confirmed.
        </p>
        <button
          type="button"
          onClick={() => setSentTo(null)}
          className="mt-6 inline-flex min-h-12 items-center rounded-full border border-charcoal/25 px-6 text-sm font-medium hover:border-charcoal hover:bg-charcoal hover:text-cream"
        >
          Make another request
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} className="space-y-6" aria-describedby="form-note">
      <p id="form-note" className="text-sm text-ink-muted">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            onChange={() => clearError("name")}
            className={`${inputClass} ${border("name")}`}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            onChange={() => clearError("email")}
            className={`${inputClass} ${border("email")}`}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-medium">
            Phone <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
            onChange={() => clearError("phone")}
            className={`${inputClass} ${border("phone")}`}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>

        <div>
          <label htmlFor="date" className="text-sm font-medium">
            Date <span aria-hidden="true">*</span>
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            aria-invalid={Boolean(errors.date)}
            aria-describedby={describedBy("date", "date-hint")}
            onChange={() => clearError("date")}
            className={`${inputClass} ${border("date")}`}
          />
          <p id="date-hint" className="mt-2 text-sm text-ink-muted">
            Open Tuesday to Sunday.
          </p>
          <FieldError id="date-error" message={errors.date} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="guests" className="text-sm font-medium">
            Guests <span aria-hidden="true">*</span>
          </label>
          <select
            id="guests"
            name="guests"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.guests)}
            aria-describedby={describedBy("guests", "guests-hint")}
            onChange={() => clearError("guests")}
            className={`${inputClass} ${border("guests")} appearance-auto`}
          >
            <option value="" disabled>
              Choose number of guests
            </option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
          <p id="guests-hint" className="mt-2 text-sm text-ink-muted">
            For nine or more, please call us.
          </p>
          <FieldError id="guests-error" message={errors.guests} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message <span className="font-normal text-ink-muted">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={600}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message", "message-hint")}
            onChange={() => clearError("message")}
            className={`${inputClass} ${border("message")} resize-y`}
          />
          <p id="message-hint" className="mt-2 text-sm text-ink-muted">
            Allergies, a special occasion, or a preferred time.
          </p>
          <FieldError id="message-error" message={errors.message} />
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-terracotta-deep px-8 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-terracotta-dark sm:w-auto"
      >
        Request a table
      </button>
    </form>
  );
}
