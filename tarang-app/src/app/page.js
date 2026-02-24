import HomePage from '@/components/HomePage';
import siteData from '@/data/siteData.json';

export default function Page() {
  return <HomePage initialData={siteData} />;
}
