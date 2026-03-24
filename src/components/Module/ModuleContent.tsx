interface ModuleContentProps {
  content: string;
}

export default function ModuleContent({ content }: ModuleContentProps) {
  const lines = content.trim().split("\n");
  let sectionCount = 0;

  const rendered = lines.map((line, i) => {
    const trimmed = line.trimStart();

    // H3 — section headers with accent bar and numbering
    if (trimmed.startsWith("### ")) {
      sectionCount++;
      return (
        <div key={i} className="mt-8 sm:mt-10 mb-4 flex items-start gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-viola/10 text-viola text-xs font-bold mt-0.5">
            {sectionCount}
          </span>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground leading-snug">
            {trimmed.slice(4)}
          </h3>
        </div>
      );
    }

    // H2 — main title
    if (trimmed.startsWith("## ")) {
      return (
        <div key={i} className="mt-2 mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-tight">
            {trimmed.slice(3)}
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-viola to-viola-light" />
        </div>
      );
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      return (
        <blockquote
          key={i}
          className="my-6 rounded-xl border-l-4 border-viola bg-viola/5 px-5 py-4 text-sm sm:text-base italic text-foreground-muted"
          style={{ fontFamily: "'Newsreader', serif" }}
        >
          <span dangerouslySetInnerHTML={{ __html: inlineFormat(trimmed.slice(2)) }} />
        </blockquote>
      );
    }

    // Bullet list
    if (trimmed.startsWith("- ")) {
      return (
        <div key={i} className="flex items-start gap-2.5 mb-2 ml-1">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-viola" />
          <span
            className="text-sm sm:text-base leading-relaxed text-foreground-muted"
            dangerouslySetInnerHTML={{ __html: inlineFormat(trimmed.slice(2)) }}
          />
        </div>
      );
    }

    // Numbered list
    const numMatch = trimmed.match(/^(\d+)\.\s(.+)/);
    if (numMatch) {
      return (
        <div key={i} className="flex items-start gap-3 mb-3 ml-1">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-alt text-xs font-bold text-viola">
            {numMatch[1]}
          </span>
          <span
            className="text-sm sm:text-base leading-relaxed text-foreground-muted pt-0.5"
            dangerouslySetInnerHTML={{ __html: inlineFormat(numMatch[2]) }}
          />
        </div>
      );
    }

    // Empty line
    if (trimmed === "") {
      return <div key={i} className="h-3" />;
    }

    // Paragraph
    return (
      <p
        key={i}
        className="mb-2.5 text-sm sm:text-base md:text-[17px] leading-relaxed sm:leading-7 text-foreground-muted"
        dangerouslySetInnerHTML={{ __html: inlineFormat(trimmed) }}
      />
    );
  });

  return <article className="prose-custom max-w-none">{rendered}</article>;
}

function inlineFormat(text: string): string {
  // Bold
  let result = text.replace(
    /\*\*(.+?)\*\*/g,
    '<strong class="text-foreground font-semibold">$1</strong>'
  );
  // Italic
  result = result.replace(
    /\*(.+?)\*/g,
    '<em class="italic" style="font-family: Newsreader, serif">$1</em>'
  );
  return result;
}
