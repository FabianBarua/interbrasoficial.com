import { HeroUIProvider } from "@heroui/system";

export const HeroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <HeroUIProvider>
            {children}
        </HeroUIProvider>
    );
};  