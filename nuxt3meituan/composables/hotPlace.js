export function usehotPlace() {
    const hotPlace = useState("hotPlace", () => []);
    return {
        hotPlace
    };
  }
  