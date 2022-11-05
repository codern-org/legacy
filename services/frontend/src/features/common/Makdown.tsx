import { classNames } from '@/utils/Classes';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

type MarkdownProps = {
  markdown: string,
};

export const Markdown = ({
  markdown,
}: MarkdownProps) => {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(marked.parse(markdown))
      }}
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
