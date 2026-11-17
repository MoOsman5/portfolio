import { Fragment } from "react";

/** Splits text into masked words for staggered reveals. Reads as plain text to search engines and screen readers. */
export function Words({ text, start = 0 }: { text: string; start?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="w">
            <span className="wi" style={{ ["--i" as string]: i + start }}>{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

/** Splits text into letters. Use on a parent that carries an aria-label with the full text. */
export function Chars({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <span aria-hidden="true">
      {Array.from(text).map((c, i) => (
        <span key={i} className="ch" style={{ ["--i" as string]: i + start }}>{c === " " ? " " : c}</span>
      ))}
    </span>
  );
}
