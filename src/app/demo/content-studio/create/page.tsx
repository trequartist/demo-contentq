"use client";

import { useContentStudioStore } from '@/lib/stores/content-studio-store';
import BlogWorkflow from './workflow-page';
import LinkedInWorkflow from './linkedin-workflow';
import ImproveWorkflow from './improve-workflow';

export default function CreatePage() {
  const store = useContentStudioStore();

  // Route to appropriate workflow based on active workflow type
  switch (store.activeWorkflow) {
    case 'linkedin-create':
      return <LinkedInWorkflow />;
    case 'blog-improve':
      return <ImproveWorkflow />;
    case 'blog-create':
    default:
      return <BlogWorkflow />;
  }
}
