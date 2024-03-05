export function usePosition() {
  const position = useState("position", () => "苏州");
  return {
    position
  };
}
