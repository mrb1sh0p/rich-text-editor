import DOMPurify from "dompurify";

type SanitizeOptions = {
  allowedTags?: string[];
  allowedAttributes?: Record<string, string[]>;
};

const defaultOptions: SanitizeOptions = {
  allowedTags: [
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
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
  ],
  allowedAttributes: {
    a: [
      "href",
      "src",
      "alt",
      "class",
      "data-*",
      "scope",
      "role",
      "data-cell",
      "class",
    ],
    img: ["src", "alt", "width", "height"],
  },
};

export const sanitizeHTML = (
  html: string,
  options: SanitizeOptions = defaultOptions
): string => {
  return DOMPurify.sanitize(html, {
    ...defaultOptions,
    ...options,
    RETURN_TRUSTED_TYPE: true,
  }) as unknown as string;
};
