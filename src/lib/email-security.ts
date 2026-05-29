const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "tempmail.com",
  "10minutemail.com",
  "guerrillamail.com",
  "yopmail.com",
  "trashmail.com",
  "maildrop.cc",
  "sharklasers.com",
  "getnada.com",
  "dispostable.com",
  "mailnesia.com",
  "fakeinbox.com",
  "temp-mail.org",
  "tempmailo.com",
]);

export function isDisposableEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  const atIndex = normalized.lastIndexOf("@");
  if (atIndex <= 0 || atIndex === normalized.length - 1) return false;
  const domain = normalized.slice(atIndex + 1);
  return DISPOSABLE_EMAIL_DOMAINS.has(domain);
}
