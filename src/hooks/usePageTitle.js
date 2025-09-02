import { useEffect } from "react";
import { BASE_PAGE_TITLE, createPageTitle } from "../basePageTitle.js";

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = createPageTitle(title);
    return () => {
      document.title = BASE_PAGE_TITLE;
    };
  }, [title]);
}
