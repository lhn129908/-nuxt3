export function useArtistic() {
  const artistic = useState("artistic", () => {
    return {};
  });
  return {
    artistic
  };
}
