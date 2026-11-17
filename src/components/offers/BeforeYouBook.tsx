import { beforeYouBook } from "../../content/offer";
import { cn } from "../../lib/utils";

/** "Before you book" (change 1): the two downloadable PDFs. */
export function BeforeYouBook({ className }: { className?: string }) {
  return (
    <section aria-labelledby="before-you-book-h" className={cn("panel p-6 min-[641px]:p-7", className)} data-before-you-book>
      <h2 id="before-you-book-h" className="t-h3 text-ink">
        Before you book
      </h2>
      <ul className="mt-4 grid gap-3 min-[700px]:grid-cols-2">
        {beforeYouBook.map((doc) => (
          <li key={doc.href}>
            <a
              href={doc.href}
              download
              data-cta={`download-${doc.href.split("/").pop()?.replace(".pdf", "")}`}
              className="text-[17px] font-semibold text-teal underline underline-offset-4 hover:decoration-2"
            >
              {doc.label} (PDF)
            </a>
            <p className="t-small text-muted">{doc.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
