import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Save, Trash2, AlignLeft, AlignCenter, AlignRight, Maximize } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageAlignment } from "./ImageUploadZone";

interface ImageEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageElement: HTMLImageElement | null;
  onSave: (alt: string, caption: string, size: number, alignment: ImageAlignment) => void;
  onDelete: () => void;
}

export function ImageEditDialog({
  open,
  onOpenChange,
  imageElement,
  onSave,
  onDelete,
}: ImageEditDialogProps) {
  const [altText, setAltText] = useState("");
  const [caption, setCaption] = useState("");
  const [size, setSize] = useState(100);
  const [alignment, setAlignment] = useState<ImageAlignment>("center");
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (imageElement) {
      setAltText(imageElement.alt || "");
      
      // Get current size
      const currentWidth = imageElement.style.width;
      if (currentWidth && currentWidth.includes("%")) {
        setSize(parseInt(currentWidth));
      } else if (currentWidth === "100%" || !currentWidth) {
        setSize(100);
      }
      
      // Get current alignment
      const wrapper = imageElement.closest("div[data-image-wrapper]") as HTMLElement;
      if (wrapper) {
        const align = wrapper.getAttribute("data-alignment") as ImageAlignment;
        setAlignment(align || "center");
      } else {
        setAlignment("center");
      }
      
      // Check if image is inside a figure with caption
      const figure = imageElement.closest("figure");
      if (figure) {
        const figcaption = figure.querySelector("figcaption");
        setCaption(figcaption?.textContent || "");
      } else {
        setCaption("");
      }
    }
  }, [imageElement]);

  const handleSave = () => {
    if (!altText.trim()) {
      setShowWarning(true);
      return;
    }
    
    onSave(altText.trim(), caption.trim(), size, alignment);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Image Details</DialogTitle>
          <DialogDescription>
            Update accessibility and caption information for this image.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {imageElement && (
            <div className="relative rounded-lg overflow-hidden border border-border bg-muted p-4">
              <div style={{ display: "flex", justifyContent: alignment === "full" ? "stretch" : alignment }}>
                <img
                  src={imageElement.src}
                  alt={altText || "Preview"}
                  style={{
                    width: alignment === "full" ? "100%" : `${size}%`,
                    height: "auto",
                    maxHeight: "12rem",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>
            </div>
          )}

          {showWarning && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Alt text is required for accessibility. Please describe what's in the image.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            <Label>Alignment</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={alignment === "left" ? "default" : "outline"}
                size="sm"
                onClick={() => setAlignment("left")}
                className="flex-1"
              >
                <AlignLeft className="h-4 w-4 mr-2" />
                Left
              </Button>
              <Button
                type="button"
                variant={alignment === "center" ? "default" : "outline"}
                size="sm"
                onClick={() => setAlignment("center")}
                className="flex-1"
              >
                <AlignCenter className="h-4 w-4 mr-2" />
                Center
              </Button>
              <Button
                type="button"
                variant={alignment === "right" ? "default" : "outline"}
                size="sm"
                onClick={() => setAlignment("right")}
                className="flex-1"
              >
                <AlignRight className="h-4 w-4 mr-2" />
                Right
              </Button>
              <Button
                type="button"
                variant={alignment === "full" ? "default" : "outline"}
                size="sm"
                onClick={() => setAlignment("full")}
                className="flex-1"
              >
                <Maximize className="h-4 w-4 mr-2" />
                Full
              </Button>
            </div>
          </div>

          {alignment !== "full" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Size</Label>
                <span className="text-xs text-muted-foreground">{size}%</span>
              </div>
              <Slider
                value={[size]}
                onValueChange={(value) => setSize(value[0])}
                min={25}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="edit-alt-text" className="flex items-center gap-2">
              Alt Text <span className="text-xs text-destructive">*Required</span>
            </Label>
            <Input
              id="edit-alt-text"
              placeholder="Describe the image for screen readers..."
              value={altText}
              onChange={(e) => {
                setAltText(e.target.value);
                setShowWarning(false);
              }}
              maxLength={150}
              className={showWarning ? "border-destructive" : ""}
            />
            <p className="text-xs text-muted-foreground">
              {altText.length}/150 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-caption">
              Caption <span className="text-xs text-muted-foreground">(Optional)</span>
            </Label>
            <Textarea
              id="edit-caption"
              placeholder="Add a caption or additional context..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              maxLength={300}
              rows={2}
            />
            <p className="text-xs text-muted-foreground">
              {caption.length}/300 characters
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
            <Button variant="destructive" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
