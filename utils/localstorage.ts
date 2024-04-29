export function loadArrFromLocalStorage(target: string): any[] {
    if (process.server) return [];

    const loadedData = JSON.parse(localStorage.getItem(target) || "{}");
    return loadedData && Array.isArray(loadedData) ? loadedData : [];
}

export function loadObjFromLocalStorage(target: string): { [key: string]: any } {
    if (process.server) return {};

    const loadedData = JSON.parse(localStorage.getItem(target) || "{}");
    return loadedData && typeof loadedData === "object" ? loadedData : {};
}

export function saveToLocalStorage(target: string, data: any): void {
    if (process.server) return;

    localStorage.setItem(target, JSON.stringify(data));
}

export function removeFromLocalStorage(target: string): void {
    if (process.server) return;

    localStorage.removeItem(target);
}

export function checkLocalToken(): boolean {
    const { token } = loadObjFromLocalStorage("auth");
    return !!token;
}
