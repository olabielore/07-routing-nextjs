import NotesList from "@/components/NoteList/NoteList";

interface FilteredPageProps {
    params: { tag: string[] };
};

export default async function FilteredNotesPage({ params }: FilteredPageProps) {
    const slug = params.tag[0];

  return <NotesList tag={slug === "all" ? undefined : slug} />;
}
