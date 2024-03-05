export function useMenu() {
    const menu = useState("menu", () => []);
    return {
        menu
    };
  }
  