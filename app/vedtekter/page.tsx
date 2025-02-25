'use client';

import { useState, useEffect, useRef } from 'react';
import Asciidoctor from 'asciidoctor';
import { animateScroll as scroll } from 'react-scroll';
import { ChevronUp } from 'lucide-react';

const VedtekterPage = () => {
  const [html, setHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

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
            toc: 'left',
            attributes: 'allow-uri-read',
          },
        }) as string;

        const cleanedHtml = convertedHtml.replace(
          '<div id="toctitle">Table of Contents</div>',
          '',
        );

        setHtml(cleanedHtml);
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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: 'easeInOutQuad',
    });
  };

  const SkeletonLoader = () => (
    <div className="space-y-4 animate-pulse mt-8">
      {[...Array(22)].map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-gray-700 rounded w-${['full', '5/6', '4/5', '3/4'][index % 4]}`}
        ></div>
      ))}
    </div>
  );

  const replaceLinks = (content: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const links = doc.querySelectorAll('a');

    links.forEach((link) => {
      if (link.hash) {
        const targetId = link.hash.slice(1);
        const newLink = document.createElement('span');
        newLink.innerHTML = link.innerHTML;
        newLink.className = 'cursor-pointer text-blue-400 hover:underline';
        newLink.setAttribute('data-target', targetId);
        link.parentNode?.replaceChild(newLink, link);
      }
    });

    return doc.body.innerHTML;
  };

  return (
    <div className="container mx-auto px-4 py-10 sm:py-20 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-center">
        Fondets Vedtekter
      </h1>
      <div className="max-w-4xl mx-auto shadow-lg bg-gray-800 rounded-lg overflow-hidden">
        <div className="p-6" ref={contentRef}>
          {isLoading ? (
            <SkeletonLoader />
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <div
              className="prose prose-base sm:prose-lg lg:prose-xl max-w-none prose-invert prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400 prose-strong:text-white prose-ul:text-gray-300 prose-ol:text-gray-300"
              dangerouslySetInnerHTML={{ __html: replaceLinks(html) }}
              onClick={(e) => {
                const target = (e.target as HTMLElement).closest(
                  '[data-target]',
                );
                if (target) {
                  const targetId = target.getAttribute('data-target');
                  if (targetId) {
                    e.preventDefault();
                    const element = document.getElementById(targetId);
                    if (element) {
                      scroll.scrollTo(element.offsetTop - 20, {
                        duration: 500,
                        smooth: 'easeInOutQuad',
                      });
                    }
                  }
                }
              }}
            />
          )}
        </div>
      </div>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
};

export default VedtekterPage;
