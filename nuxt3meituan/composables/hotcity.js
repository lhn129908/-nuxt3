export function usehotCity() {
    const hotCity = useState("hotCity", () => []);
    return {
        hotCity
    };
  }
  