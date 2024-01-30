import {FuseSettingsConfigType} from '@fuse/core/FuseSettings/FuseSettings';

/**
 * The type definition for a user object.
 */
export type User = {
  role: string[] | string | null;
  data: {};
  settings?: Partial<FuseSettingsConfigType>;
};
