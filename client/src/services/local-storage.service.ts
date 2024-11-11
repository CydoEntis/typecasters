const LocalStorageService = {
	setItem(key: string, value: any): void {
		localStorage.setItem(key, JSON.stringify(value));
	},

	getItem<T>(key: string): T | null {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : null;
	},

	removeItem(key: string): void {
		localStorage.removeItem(key);
	},

	clearStorage(): void {
		localStorage.clear();
	},
};

export default LocalStorageService;
