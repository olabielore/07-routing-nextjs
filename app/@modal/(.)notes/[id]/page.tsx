import NotePreview from "@/components/NotePreview/NotePreview";

interface NoteModalProps {
  params: {
    id: string;
  };
};

export default function NoteModalPage({ params }: NoteModalProps) {
  return <NotePreview id={params.id} />;
}
