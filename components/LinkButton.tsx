'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ClipLoader } from 'react-spinners';

export default function LinkButton({
       href,
       children,
       className,
        }: {
        href: string;
        children: React.ReactNode;
        className?: string;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsLoading(false);
    }, [pathname, searchParams]);

    return (
        <Link
            href={href}
            passHref
            className={`relative ${className}`}
            onClick={() => setIsLoading(true)}
        >
      <span className={`${isLoading ? 'invisible' : 'visible'}`}>
        {children}
      </span>

            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <ClipLoader
                        size={20}
                        color="#ffffff"
                        cssOverride={{ display: 'block' }}
                    />
                </div>
            )}
        </Link>
    );
}