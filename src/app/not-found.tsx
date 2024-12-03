import Link from "next/link";

import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <FileQuestion
          className="mx-auto mb-4 h-14 w-14 text-brand"
          aria-hidden="true"
        />
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          404 - Page Not Found
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/default"
          className="inline-flex items-center rounded-md border border-transparent bg-brand px-6 py-3 text-base font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
