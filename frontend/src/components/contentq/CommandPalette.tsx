import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  FileText,
  Linkedin,
  Target,
  Search,
  Brain,
  Home,
  Sparkles,
  Calendar,
} from "lucide-react";
import { useDemoStore } from "@/stores/demoStore";
import { useWorkflowStore } from "@/stores/workflowStore";
import { toast } from "sonner";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { brainDocuments } = useDemoStore();
  const { startWorkflow } = useWorkflowStore();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleAction = (action: string, params?: any) => {
    setOpen(false);
    
    switch (action) {
      case "create-blog":
        navigate("/studio");
        setTimeout(() => startWorkflow("blog"), 100);
        break;
      case "create-linkedin":
        navigate("/studio");
        setTimeout(() => startWorkflow("linkedin"), 100);
        break;
      case "navigate":
        navigate(params.path);
        break;
      case "upload-document":
        navigate("/brain");
        toast.info("Upload document", {
          description: "Click the 'Upload Documents' button"
        });
        break;
      default:
        break;
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Quick Actions">
          <CommandItem
            onSelect={() => handleAction("create-blog")}
            className="gap-2 cursor-pointer"
          >
            <FileText className="h-4 w-4 text-primary" />
            <span>Create Blog Post</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleAction("create-linkedin")}
            className="gap-2 cursor-pointer"
          >
            <Linkedin className="h-4 w-4 text-primary" />
            <span>Create LinkedIn Post</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleAction("upload-document")}
            className="gap-2 cursor-pointer"
          >
            <Brain className="h-4 w-4 text-primary" />
            <span>Upload Document to Brain</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Navigate">
          <CommandItem
            onSelect={() => handleAction("navigate", { path: "/studio" })}
            className="gap-2 cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>Content Studio</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleAction("navigate", { path: "/strategy" })}
            className="gap-2 cursor-pointer"
          >
            <Target className="h-4 w-4" />
            <span>Strategy Room</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleAction("navigate", { path: "/research" })}
            className="gap-2 cursor-pointer"
          >
            <Search className="h-4 w-4" />
            <span>Research Desk</span>
          </CommandItem>
          <CommandItem
            onSelect={() => handleAction("navigate", { path: "/brain" })}
            className="gap-2 cursor-pointer"
          >
            <Brain className="h-4 w-4" />
            <span>Marketing Brain</span>
          </CommandItem>
        </CommandGroup>

        {brainDocuments.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Recent Documents">
              {brainDocuments.slice(0, 5).map((doc) => (
                <CommandItem
                  key={doc.id}
                  onSelect={() => handleAction("navigate", { path: "/brain" })}
                  className="gap-2 cursor-pointer"
                >
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span>{doc.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
