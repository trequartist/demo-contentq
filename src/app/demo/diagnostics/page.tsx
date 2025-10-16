import { redirect } from 'next/navigation';

export default function DiagnosticsPage() {
  redirect('/demo/creator?tab=diagnostics');
}
