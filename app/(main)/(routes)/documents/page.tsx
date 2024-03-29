'use client';

import Image from 'next/image';
import { useUser } from '@clerk/clerk-react';

import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';

function DocumentsPage() {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: 'Untitled' });

    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'New note created!',
      error: 'Failed to create a new note.',
    });
  };

  return (
    <div className="h-full flex flex-col justify-center items-center space-y-4">
      <Image
        src="/empty.png"
        height={300}
        width={300}
        alt="Empty Image"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        height={300}
        width={300}
        alt="Empty Image"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.fullName}&apos;s Notion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
}

export default DocumentsPage;
