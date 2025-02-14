import DOMPurify from "dompurify";

const ALLOWED_TAGS = [
  "h1",
  "h2",
  "h3",
  "p",
  "ul",
  "ol",
  "li",
  "a",
  "img",
  "strong",
  "em",
  "u",
  "br",
];
const ALLOWED_ATTR = ["href", "src", "alt", "class", "data-*"];

export const sanitizeHTML = (html) =>
  DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    FORBID_TAGS: ["style", "script"],
    FORBID_ATTR: ["onclick", "style"],
    RETURN_TRUSTED_TYPE: true,
  });
