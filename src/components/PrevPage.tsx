import { prevPageLayout, prevPageLink } from '@/styles/layout.css';
import Link from 'next/link';
import { MdKeyboardArrowLeft } from 'react-icons/md';

/**
 * PrevPage component
 * @param url URL to go back
 * @param children children components
 */
export default function PrevPage({
  url,
  children,
}: {
  url: string;
  children: React.ReactNode;
}) {
  return (
    <div className={prevPageLayout}>
      <Link href={url} className={prevPageLink}>
        <MdKeyboardArrowLeft />
        이전으로
      </Link>
      {children}
    </div>
  );
}
