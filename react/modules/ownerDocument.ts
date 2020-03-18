export default function ownerDocument(node: HTMLElement | null | undefined) {
  return node?.ownerDocument ?? window.document
}
