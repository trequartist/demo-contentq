import { redirect } from 'next/navigation';

export default function PlaybookPage() {
  redirect('/demo/creator?tab=playbook');
}
