import { getCargoAlbumPhotos, type OrderPhoto } from "@/lib/cargoPhotos";
import { getFlickrAlbumGallery } from "@/lib/flickr";

export {
  buildOrderFormUrl,
  ORDER_GOOGLE_FORM_BASE_URL,
  ORDER_GOOGLE_FORM_PHOTO_ENTRY,
} from "@/lib/orderFormUrl";

export type { OrderPhoto };

export const ORDER_FLICKR_ALBUM_ID = "72177720334591696";

/** Change this to get a different stable gallery order. */
export const ORDER_PHOTO_SHUFFLE_SEED = 42;

function hashString(value: string): number {
  return Array.from(value).reduce((hash, char) => {
    return Math.imul(hash ^ char.charCodeAt(0), 0x5bd1e995) >>> 0;
  }, 2166136261);
}

function seededRank(seed: number, key: string): number {
  return hashString(`${seed}:${key}`) / 0xffffffff;
}

function shuffleOrderPhotos(
  photos: readonly OrderPhoto[],
  seed: number,
): readonly OrderPhoto[] {
  return photos
    .map((photo) => ({
      photo,
      rank: seededRank(seed, photo.src),
    }))
    .toSorted((left, right) => {
      if (left.rank !== right.rank) {
        return left.rank - right.rank;
      }

      return left.photo.src.localeCompare(right.photo.src);
    })
    .map(({ photo }) => photo);
}

export async function getShuffledOrderPhotos(): Promise<readonly OrderPhoto[]> {
  const [cargoPhotos, flickrGallery] = await Promise.all([
    getCargoAlbumPhotos(),
    getFlickrAlbumGallery(ORDER_FLICKR_ALBUM_ID),
  ]);

  const flickrPhotos = flickrGallery.photos.map((photo) => ({
    src: photo.src,
    name: photo.alt,
  }));

  return shuffleOrderPhotos(
    [...cargoPhotos, ...flickrPhotos],
    ORDER_PHOTO_SHUFFLE_SEED,
  );
}
