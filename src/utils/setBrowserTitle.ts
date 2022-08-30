export default function setBrowserTitle(title: string) {
  if (!title || !title.length) return;
  document.title = title;
}
