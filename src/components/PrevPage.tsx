'use client';
import { prevLink } from '@/styles/components/prevPage.css';
import Link from 'next/link';
import { MdKeyboardArrowLeft } from 'react-icons/md';

/**
 * PrevPage component
 * @param url URL to go back
 * @param children children components
 */
export default function PrevPage({
  url,
}: {
  url: string;
}) {
  return (
      <Link href={url} className={prevLink}>
        <MdKeyboardArrowLeft />
        이전으로
      </Link>
  );
}
