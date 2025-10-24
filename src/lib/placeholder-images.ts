import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;

// Helper function to find an image by its ID
export const findImage = (id: string): ImagePlaceholder => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    console.warn(`Image with id "${id}" not found. Using fallback.`);
    // Fallback image
    return {
      id: 'fallback',
      imageUrl: `https://picsum.photos/seed/${id}/1200/800`,
      description: `A fallback image for ${id}`,
      imageHint: 'abstract',
    };
  }
  return image;
};
