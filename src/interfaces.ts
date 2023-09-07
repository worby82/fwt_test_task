import { IAuthor } from './models/IAuthor';
import { ILocation } from './models/ILocation';
import { IPainting } from './models/IPainting';

export interface ThemeReducerState {
  isDarkTheme: boolean;
}

export interface IPaintingsRequestData {
  data: IPainting[];
  totalCount: number;
}

export interface IPaintingsRequestArguments {
  q?: string;
  created_gte?: string;
  created_lte?: string;
  authorId?: number;
  locationId?: number;
}

export interface AppDataReducerState {
  paintingsRequestArguments: IPaintingsRequestArguments | null;
  paintingsCurentPage: number;
  authors: IAuthor[];
  locations: ILocation[];
}

type KeyPaintingsRequestArguments = keyof IPaintingsRequestArguments;

export interface PayloadPaintingsRequestArguments {
  argumentKey: KeyPaintingsRequestArguments;
  value: string | number | null;
}
