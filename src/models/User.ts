type User = {
  readonly created_at: string;
  readonly id: string;
  name: string;
  email: string;
  email_verified_at: null | string;
  profile: UserProfile;
  updated_at: null | string;
  board_unit: {
    board_id: string;
    unit_id: string;
  };
};

export type UserProfile =
  | 'general_manager'
  | 'director'
  | 'manager'
  | 'salesman';

export default User;
