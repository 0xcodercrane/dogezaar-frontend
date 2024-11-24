export default function Button({
  onHandle,
  content,
}: {
  onHandle?: () => void;
  content: string;
}) {
  return (
    <div className="border-2 rounded-md border-primary px-3 py-2">
      <button onClick={onHandle}>{content}</button>
    </div>
  );
}
