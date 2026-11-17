/* Shared section registry — imported by App (scroll-spy), Nav (menu) and
   MobileBar (quick-nav). Kept out of component files so fast-refresh works. */
export const SECTION_IDS = ["about", "stack", "experience", "projects", "contact"] as const;
export type SectionId = (typeof SECTION_IDS)[number];
