import "i18next";
import common from "../public/locales/en/common.json";
import editor from "../public/locales/en/editor.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof common;
      editor: typeof editor;
    };
  }
}
