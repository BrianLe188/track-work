import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, Paperclip, Send, Smile } from "lucide-react";
import { ChangeEvent, KeyboardEvent } from "react";

interface Props {
  value: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  onEnter: (e: KeyboardEvent) => void;
  onSend: () => void;
}

export default function InputAction({
  value,
  onChangeValue,
  onEnter,
  onSend,
}: Props) {
  return (
    <div className="p-4">
      <div className="flex items-end gap-2">
        <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0">
          <Paperclip className="h-5 w-5" />
        </Button>
        <div className="relative flex-1">
          <Input
            placeholder="Type a message..."
            className="min-h-10 pr-20"
            value={value}
            onChange={onChangeValue}
            onKeyDown={onEnter}
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ImageIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Smile className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <Button
          size="icon"
          className="h-10 w-10 shrink-0"
          onClick={onSend}
          disabled={value.trim() === ""}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
