import { useAppSelector } from '../store';

export function useGetAuthorName() {
  const authors = useAppSelector((state) => state.appData.authors);
  return (authorId: number) => {
    return authors.find((author) => author.id === authorId)?.name ?? '';
  };
}

export function useGetLocationName() {
  const locations = useAppSelector((state) => state.appData.locations);
  return (locationId: number) => {
    return locations.find((location) => location.id === locationId)?.location ?? '';
  };
}

export function useGetAuthorId() {
  const authors = useAppSelector((state) => state.appData.authors);
  return (authorName: string) => {
    return authors.find((author) => author.name === authorName)?.id ?? null;
  };
}

export function useGetLocationId() {
  const locations = useAppSelector((state) => state.appData.locations);
  return (locationName: string) => {
    return locations.find((location) => location.location === locationName)?.id ?? null;
  };
}
