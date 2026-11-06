"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Info, Phone } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

type Field = "name" | "email" | "phone" | "date" | "guests" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+()\d\s.-]{10,20}$/;

const copy = {
  fr: {
    errors: {
      name: "Indiquez votre nom.",
      email: "Indiquez une adresse e-mail, par exemple nom@exemple.fr.",
      phone: "Indiquez un numéro de téléphone, ou laissez ce champ vide.",
      dateEmpty: "Choisissez la date de votre venue.",
      datePast: "Choisissez aujourd'hui ou une date à venir.",
      dateClosed: "Le restaurant est fermé le mercredi. Choisissez un autre jour.",
      guests: "Choisissez le nombre de personnes.",
      message: "Votre message doit faire moins de 500 caractères.",
    },
    note: "Démonstration : ce formulaire n'envoie rien au restaurant. Pour réserver, appelez le",
    required: "Les champs marqués",
    requiredEnd: "sont obligatoires.",
    requiredSr: "d'un astérisque",
    name: "Nom",
    email: "E-mail",
    phone: "Téléphone",
    optional: "(facultatif)",
    date: "Date",
    dateHint: "Ouvert le midi tous les jours sauf le mercredi, le soir le vendredi et le samedi.",
    guests: "Nombre de personnes",
    guestsChoose: "Choisir le nombre de personnes",
    guest: (n: number) => `${n} ${n === 1 ? "personne" : "personnes"}`,
    guestsHint: "Pour un groupe, appelez-nous.",
    message: "Message",
    messageHint: "Allergies, occasion particulière, midi ou soir.",
    submit: "Demander une table",
    demoTitle: `Formulaire de démonstration – appelez le ${site.phone}`,
    demoText: "Ce site est un projet d'entraînement : rien n'a été envoyé et aucune table n'est réservée.",
    call: `Appeler le ${site.phone}`,
    back: "Revenir au formulaire",
  },
  en: {
    errors: {
      name: "Enter your name.",
      email: "Enter an email address, for example name@example.com.",
      phone: "Enter a phone number, or leave this empty.",
      dateEmpty: "Choose a date for your visit.",
      datePast: "Choose today or a date in the future.",
      dateClosed: "The restaurant is closed on Wednesdays. Choose another day.",
      guests: "Choose how many guests.",
      message: "Keep your message under 500 characters.",
    },
    note: "Demo: this form does not send anything to the restaurant. To book, call",
    required: "Fields marked",
    requiredEnd: "are required.",
    requiredSr: "with an asterisk",
    name: "Name",
    email: "Email",
    phone: "Phone",
    optional: "(optional)",
    date: "Date",
    dateHint: "Open for lunch every day except Wednesday, and for dinner on Friday and Saturday.",
    guests: "Guests",
    guestsChoose: "Choose number of guests",
    guest: (n: number) => `${n} ${n === 1 ? "guest" : "guests"}`,
    guestsHint: "For a group, please call us.",
    message: "Message",
    messageHint: "Allergies, a special occasion, lunch or dinner.",
    submit: "Request a table",
    demoTitle: `Demo form – please call ${site.phone}`,
    demoText: "This website is a practice project: nothing has been sent and no table is booked.",
    call: `Call ${site.phone}`,
    back: "Back to the form",
  },
};

function validate(data: FormData, t: (typeof copy)["fr"]["errors"]): Errors {
  const errors: Errors = {};
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const phone = String(data.get("phone") ?? "").trim();
  const date = String(data.get("date") ?? "");
  const guests = String(data.get("guests") ?? "");
  const message = String(data.get("message") ?? "").trim();

  if (name.length < 2) errors.name = t.name;
  if (!EMAIL_PATTERN.test(email)) errors.email = t.email;
  if (phone && !PHONE_PATTERN.test(phone)) errors.phone = t.phone;

  if (!date) {
    errors.date = t.dateEmpty;
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const chosen = new Date(`${date}T00:00:00`);
    if (chosen < today) errors.date = t.datePast;
    else if (chosen.getDay() === 3) errors.date = t.dateClosed;
  }

  if (!guests) errors.guests = t.guests;
  if (message.length > 500) errors.message = t.message;

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

/** Demo booking form: it checks the fields, then only shows a "please call" message. Nothing is sent. */
export function ContactForm({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors = validate(new FormData(form), t.errors);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0] as Field | undefined;
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    form.reset();
    setSubmitted(true);
  }

  // Move keyboard and screen-reader focus to the message once it renders.
  useEffect(() => {
    if (submitted) statusRef.current?.focus();
  }, [submitted]);

  function clearError(field: Field) {
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  }

  const describedBy = (field: Field, hint?: string) =>
    [hint, errors[field] ? `${field}-error` : null].filter(Boolean).join(" ") || undefined;

  const border = (field: Field) => (errors[field] ? "border-terracotta-dark" : "border-charcoal/20");

  if (submitted) {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-sm border border-olive/60 bg-white/60 p-8 focus:outline-none"
      >
        <Info className="size-8 text-olive-deep" strokeWidth={1.5} aria-hidden="true" />
        <h3 className="mt-4 font-serif text-3xl leading-tight">{t.demoTitle}</h3>
        <p className="mt-3 leading-relaxed text-ink-muted">{t.demoText}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={site.phoneHref}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-terracotta-deep px-6 text-sm font-medium text-cream hover:bg-terracotta-dark"
          >
            <Phone className="size-4" aria-hidden="true" />
            {t.call}
          </a>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-charcoal/25 px-6 text-sm font-medium hover:border-charcoal hover:bg-charcoal hover:text-cream"
          >
            {t.back}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6" aria-describedby="form-demo form-note">
      <p id="form-demo" className="rounded-sm border border-olive/60 bg-white/60 px-4 py-3 text-sm leading-relaxed">
        {t.note}{" "}
        <a href={site.phoneHref} className="font-medium whitespace-nowrap underline underline-offset-4">
          {site.phone}
        </a>
        .
      </p>
      <p id="form-note" className="text-sm text-ink-muted">
        {t.required} <span aria-hidden="true">*</span>
        <span className="sr-only">{t.requiredSr}</span> {t.requiredEnd}
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            {t.name} <span aria-hidden="true">*</span>
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
            {t.email} <span aria-hidden="true">*</span>
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
            {t.phone} <span className="font-normal text-ink-muted">{t.optional}</span>
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
            {t.date} <span aria-hidden="true">*</span>
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
            {t.dateHint}
          </p>
          <FieldError id="date-error" message={errors.date} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="guests" className="text-sm font-medium">
            {t.guests} <span aria-hidden="true">*</span>
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
              {t.guestsChoose}
            </option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>
                {t.guest(n)}
              </option>
            ))}
          </select>
          <p id="guests-hint" className="mt-2 text-sm text-ink-muted">
            {t.guestsHint}
          </p>
          <FieldError id="guests-error" message={errors.guests} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium">
            {t.message} <span className="font-normal text-ink-muted">{t.optional}</span>
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
            {t.messageHint}
          </p>
          <FieldError id="message-error" message={errors.message} />
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-terracotta-deep px-8 text-sm font-medium tracking-wide text-cream transition-colors hover:bg-terracotta-dark sm:w-auto"
      >
        {t.submit}
      </button>
    </form>
  );
}
