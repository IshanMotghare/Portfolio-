import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemedMain from "@/components/ThemedMain";

export default function Home() {
  return (
    <ThemeProvider>
      <ThemedMain />
    </ThemeProvider>
  );
}

