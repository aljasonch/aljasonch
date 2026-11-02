type ChatKey = {
  key: string;
  ctrlKey: boolean;
  shiftKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  isComposing: boolean;
};
export function chatEnterAction(
  event: ChatKey,
  desktop: boolean,
): "send" | "newline" | "native" {
  if (!desktop || event.isComposing || event.key !== "Enter") return "native";
  if (event.ctrlKey) return "newline";
  return event.shiftKey || event.metaKey || event.altKey ? "native" : "send";
}
