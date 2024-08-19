import PrevPage from '@/components/PrevPage';

export default function Template({ children }: { children: React.ReactNode }) {
  return <PrevPage url="/">{children}</PrevPage>;
}
