import { PAGE_SIZE } from "@/hooks/useDoctors";

type Props = {
  visibleCount: number;
  totalFiltered: number;
  onLoadMore: () => void;
};

export function LoadMore({ visibleCount, totalFiltered, onLoadMore }: Props) {
  const remaining = Math.max(0, totalFiltered - visibleCount);
  if (remaining === 0) return null;

  const nextChunk = Math.min(PAGE_SIZE, remaining);

  return (
    <div className="flex justify-center pt-4">
      <button
        type="button"
        onClick={onLoadMore}
        className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-800 shadow-sm ring-1 ring-teal-200 transition hover:bg-teal-50"
      >
        Load more ({remaining} left)
        <span className="sr-only">, loads up to {nextChunk} more</span>
      </button>
    </div>
  );
}
