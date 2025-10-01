"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  displayLink?: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  const fetchSearchResults = async (searchTerm: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch results');
      }
      
      setResults(data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      {/* Header with Search */}
      <header className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-10">
        <div className="px-4 py-3 flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 flex-shrink-0">
            <Image
              src="/next.svg"
              alt="Next.js"
              width={80}
              height={20}
              className="dark:invert"
            />
            <span className="text-sm font-light text-gray-600 dark:text-gray-400">Search</span>
          </Link>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex-1 max-w-3xl">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <svg 
                  className="w-4 h-4 text-gray-400" 
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
                className="w-full px-12 py-3 text-base border border-gray-300 dark:border-gray-600 rounded-full 
                         hover:shadow-md focus:shadow-md focus:outline-none 
                         dark:bg-gray-800 dark:text-white transition-shadow"
                placeholder="Search..."
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-2 flex items-center px-4 text-blue-600 dark:text-blue-400 
                         hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full font-medium text-sm"
              >
                Search
              </button>
            </div>
          </form>

          {/* Right Icons */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <button className="w-9 h-9 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </button>
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium cursor-pointer hover:ring-2 hover:ring-blue-400">
              N
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 flex gap-6 text-sm border-b border-gray-100 dark:border-gray-800">
          <button className="pb-3 border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 font-medium flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            All
          </button>
          <button className="pb-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Images
          </button>
          <button className="pb-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Videos
          </button>
          <button className="pb-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            News
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6">
        <div className="max-w-3xl mx-auto lg:ml-[12%]">
          {/* Results Info */}
          {!loading && !error && (
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              About {results.length} results ({(Math.random() * 0.5).toFixed(2)} seconds)
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h3 className="text-red-800 dark:text-red-400 font-medium mb-2">Error loading results</h3>
              <p className="text-red-600 dark:text-red-500 text-sm">{error}</p>
              <button 
                onClick={() => fetchSearchResults(query)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Search Results */}
          {!loading && !error && results.length > 0 && (
            <div className="space-y-8">
              {results.map((result, index) => (
                <div key={index} className="group">
                  {/* Display URL */}
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs">
                      {result.displayLink?.charAt(0).toUpperCase() || 'W'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {result.displayLink || new URL(result.link).hostname}
                    </div>
                  </div>

                  {/* Title */}
                  <a
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <h3 className="text-xl text-blue-600 dark:text-blue-400 group-hover:underline mb-1">
                      {result.title}
                    </h3>
                  </a>

                  {/* Snippet */}
                  {result.snippet && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {result.snippet}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && !error && results.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                No results found for &quot;{query}&quot;
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm">
                Try different keywords or check your spelling
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 mt-12">
        <div className="px-8 py-3 border-b border-gray-300 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">Powered by Next.js</p>
        </div>
        <div className="px-8 py-4 flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-6 flex-wrap justify-center sm:justify-start">
            <Link href="https://nextjs.org/learn" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
              Learn
            </Link>
            <Link href="https://vercel.com/templates" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
              Examples
            </Link>
            <Link href="https://nextjs.org/docs" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
              Documentation
            </Link>
          </div>
          <div className="flex gap-6 flex-wrap justify-center sm:justify-end">
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">Privacy</a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">Terms</a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">Settings</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
