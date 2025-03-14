export type TUserRoles = "basic" | "developer" | "admin";
export type TUser = {
  name: string;
  email: string;
  password: string;
};

export type TUserDto = TUser & {
  roles: TUserRoles;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};
