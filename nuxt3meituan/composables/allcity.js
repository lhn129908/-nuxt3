export function useallCity() {
    const allCity = useState("allCity", () => []);
    return {
        allCity
    };
  }
  