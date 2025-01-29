'use client';

import { useState, useEffect } from 'react';
import Asciidoctor from 'asciidoctor';

const VedtekterPage = () => {
  const [html, setHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndConvertVedtekter = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/dotkom/Onlines_Fond_Vedtekter/master/vedtekter.adoc',
        );
        const vedtekter = await response.text();

        const asciidoctor = Asciidoctor();
        const convertedHtml = asciidoctor.convert(vedtekter, {
          attributes: {
            toc: 'none',
            attributes: 'allow-uri-read',
          },
        });

        setHtml(convertedHtml as string);
      } catch (error) {
        console.error('Error fetching or converting vedtekter:', error);
        setError(
          'Det oppstod en feil ved lasting av vedtektene. Vennligst prøv igjen senere.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndConvertVedtekter();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 sm:py-20 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-center">
        Fondets Vedtekter
      </h1>
      <div className="max-w-4xl mx-auto shadow-lg bg-gray-800 rounded-lg overflow-hidden">
        <div className="p-6">
          {isLoading ? (
            <p className="text-gray-400">Laster vedtekter...</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <div
              className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none prose-invert  prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400 prose-strong:text-white prose-ul:text-gray-300 prose-ol:text-gray-300"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VedtekterPage;
