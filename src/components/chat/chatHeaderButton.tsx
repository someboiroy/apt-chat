'use client';

import { Button } from '@/components/ui/button';
import { useStore } from '@/store';
import { FaBars } from 'react-icons/fa';

export default function ChatHeaderButton() {
  const isSidebarOpen = useStore.getState().isSidebarOpen;
  const { toggleSidebar } = useStore();

  return (
    <div>
      <Button
        className={`mb-2 md:mb-0 ${isSidebarOpen ? 'hidden' : ''}`}
        size={'icon'}
        variant={'outline'}
        onClick={() => {
          toggleSidebar(!isSidebarOpen);
        }}
      >
        <FaBars size={20} />
      </Button>
    </div>
  );
}
