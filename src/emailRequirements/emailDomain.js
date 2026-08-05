import emailDomains from "./emailDomain.json";

export function emailDomainOk(email) {
  if (typeof email !== "string") return false;
  const at = email.lastIndexOf("@");
  if (at < 1 || at === email.length - 1) return false;
  const domain = email.slice(at + 1).trim().toLowerCase();
  return emailDomains.allowed.includes(domain);
}