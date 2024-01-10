import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import { FaInfo } from 'react-icons/fa';

interface NewChatDialogProps {
  isOpen: boolean;
}

export default function NewChatDialog({ isOpen }: NewChatDialogProps) {
  return (
    <div>
      <Dialog open={isOpen}>
        <DialogContent>
          <Card className="border-none rounded-none shadow-none bg-none">
            <CardHeader>
              <CardTitle>New Convseration</CardTitle>
              <CardDescription>
                Start a new conversation with{' '}
                <span className="font-bold ">apt-chat</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid items-center w-full gap-4">
                  <Select>
                    <Label htmlFor="Model">Model</Label>
                    <SelectTrigger id="Model">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="gpt-3.5-turbo">
                        GPT-3.5-Turbo
                      </SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex gap-2 text-xs md:items-center md:flex-1">
                      <Label htmlFor="ChatFocus">Chat Focus</Label>
                      <HoverCard>
                        <HoverCardTrigger>
                          <div className="flex text-sm italic underline text-muted-foreground">
                            What is Chat Focus?
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="text-xs font-medium md:text-sm">
                          Chat Focus is how apt-chat has up-to-date knowledge.
                          Without a selection, apt-chat&apos;s knowledge is
                          limited.
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <Select>
                      <SelectTrigger id="ChatFocus">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Deploy</Button>
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}
