export function useProductcate() {
  const productcate = useState("productcate", () => {
    return {};
  });
  return {
    productcate,
  };
}
