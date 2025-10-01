"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Next.jsのルーティングを使用した検索結果ページへの遷移
      window.location.href = `/proxy-search/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <a 
            href="https://nextjs.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-gray-700 dark:text-gray-300 hover:underline"
          >
            About
          </a>
          <a 
            href="https://nextjs.org/docs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-gray-700 dark:text-gray-300 hover:underline"
          >
            Docs
          </a>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm text-gray-700 dark:text-gray-300 hover:underline">
            Gmail
          </button>
          <button className="text-sm text-gray-700 dark:text-gray-300 hover:underline">
            Images
          </button>
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium cursor-pointer hover:ring-2 hover:ring-blue-400">
            N
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-16">
        {/* Logo */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Image
              src="/next.svg"
              alt="Next.js"
              width={200}
              height={50}
              priority
              className="dark:invert"
            />
            <span className="text-2xl font-light text-gray-600 dark:text-gray-400">Search</span>
          </div>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <svg 
                className="w-5 h-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-12 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-full 
                       hover:shadow-lg focus:shadow-lg focus:outline-none 
                       dark:bg-gray-800 dark:text-white transition-shadow duration-200"
              placeholder="Search the web..."
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 gap-3">
              <button type="button" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14l-4-4h8l-4 4z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-center mt-8">
            <button
              type="submit"
              className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 
                       rounded hover:ring-1 hover:ring-gray-300 dark:hover:ring-gray-600 
                       font-medium text-sm transition-all"
            >
              Next.js Search
            </button>
            <button
              type="button"
              onClick={() => window.open('https://nextjs.org/docs', '_blank')}
              className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 
                       rounded hover:ring-1 hover:ring-gray-300 dark:hover:ring-gray-600 
                       font-medium text-sm transition-all"
            >
              I&apos;m Feeling Lucky
            </button>
          </div>
        </form>

        {/* Language Options */}
        <div className="mt-8 text-sm text-gray-600 dark:text-gray-400">
          Search available in:{" "}
          <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">日本語</a>
          {" "}{" "}
          <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">English</a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
        <div className="px-8 py-3 border-b border-gray-300 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">Powered by Next.js</p>
        </div>
        <div className="px-8 py-4 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-6 flex-wrap justify-center sm:justify-start">
            <a
              href="https://nextjs.org/learn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
            >
              Learn
            </a>
            <a
              href="https://vercel.com/templates?framework=next.js"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
            >
              Examples
            </a>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
            >
              Documentation
            </a>
          </div>
          <div className="flex gap-6 flex-wrap justify-center sm:justify-end">
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
            >
              Privacy
            </a>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
            >
              Terms
            </a>
            <a
              href="https://github.com/vercel/next.js"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
            >
              Settings
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
