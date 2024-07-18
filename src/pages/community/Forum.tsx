import { BoardList } from '@/components/board';

export default function Forum({ title }: { title: string }) {
  return (
    <section>
      <BoardList title={title} />
    </section>
  );
}
