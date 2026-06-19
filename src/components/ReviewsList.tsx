import { useTranslations } from "next-intl";
import { reviews } from "@/lib/reviews";
import { Reveal } from "./Reveal";
import { Stars } from "./Stars";

export function ReviewsList() {
  const t = useTranslations("reviews");

  return (
    <div>
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
        {reviews.reviews.map((review, i) => (
          <Reveal
            key={`${review.name}-${i}`}
            delay={(i % 3) * 0.06}
            className="break-inside-avoid"
          >
            <figure className="border border-[var(--color-line)] bg-[var(--color-cream)] p-7">
              <Stars rating={review.rating} className="text-[var(--color-brown)]" />
              {review.text ? (
                <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-[var(--color-brown)]">
                  {review.text}
                </blockquote>
              ) : (
                <p className="mt-4 text-sm italic text-[var(--color-brown-soft)]">
                  Rated {review.rating} / 5
                </p>
              )}
              <figcaption className="mt-5 text-[0.72rem] uppercase tracking-[0.14em] text-[var(--color-brown-soft)]">
                {review.name} · {review.date}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href={reviews.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          {t("leaveReview")}
        </a>
      </div>
    </div>
  );
}
