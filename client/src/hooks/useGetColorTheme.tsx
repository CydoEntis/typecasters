import { useComputedColorScheme } from "@mantine/core";

function useGetColorTheme() {
	const computedColorScheme = useComputedColorScheme("light", {
		getInitialValueInEffect: true,
	});

	const isLightMode = computedColorScheme === "light";

	return { computedColorScheme, isLightMode };
}

export default useGetColorTheme;
