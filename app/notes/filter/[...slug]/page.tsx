import NotesList from "@/components/NoteList/NoteList";

interface FilteredPageProps {
    params: { slug: string[] };
};

export default async function FilteredNotesPage({ params }: FilteredPageProps) {
    const slug = params.slug[0];

  return <NotesList tag={slug === "all" ? undefined : slug} />;
}
