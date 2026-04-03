"use client";

export default function CopyLinkButton({ url }: { url: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(url)}
      className="px-3 py-1 rounded-full border border-gray-300 text-xs hover:border-gray-900 transition-colors"
    >
      Copy link
    </button>
  );
}
