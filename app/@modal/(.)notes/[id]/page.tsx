import NotePreview from "@/app/@modal/(.)notes/[id]/NotePreview.client";

interface NoteModalProps {
  params: {
    id: string;
  };
};

export default function NoteModalPage({ params }: NoteModalProps) {
  return <NotePreview id={params.id} />;
}
