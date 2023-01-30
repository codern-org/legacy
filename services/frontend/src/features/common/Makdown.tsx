import { classNames } from '@/utils/Classes';
import { useMemo } from 'preact/hooks';
import DOMPurify from 'dompurify';
import MarkdownIt from 'markdown-it';
import KatexPlugin from '@iktakahiro/markdown-it-katex';

const markdownIt = new MarkdownIt({
  html: true,
  linkify: true,
}).use(KatexPlugin);

type MarkdownProps = {
  string: string,
};

export const Markdown = ({
  string,
}: MarkdownProps) => {
  const markdown = useMemo(() => {
    const dirty = markdownIt.render(string);
    const clean = DOMPurify.sanitize(dirty);
    return clean;
  }, [string]);

  return (
    <span
      dangerouslySetInnerHTML={{ __html: markdown }}
      className={classNames(
        'prose dark:prose-invert',
        'prose-blockquote:border-neutral-300 dark:prose-blockquote:border-neutral-700',
        'prose-li:marker:text-neutral-400 dark:prose-li:marker:text-neutral-600',

        'prose-th:p-2 prose-td:p-2',
        'prose-table:border-neutral-300 dark:prose-table:border-neutral-700',
        'prose-thead:border-neutral-300 dark:prose-thead:border-neutral-700',
        'prose-tr:border-neutral-300 dark:prose-tr:border-neutral-700',
      )}
    />
  );
};
