export const getImageUrl = (imagePath, fallback = "https://placehold.co/400x400?text=No+Image") => {
    if (!imagePath) return fallback;
    if (imagePath.startsWith('http')) return imagePath;

    // Remove leading slash if exists to avoid double slashes
    const path = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `http://localhost:5000/${path}`;
};
