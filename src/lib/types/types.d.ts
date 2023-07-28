type UserData = {
	id: string;
	created_at: string;
	username: string | null;
	avatar_url: string | null;
	website: string | null;
	updated_at: string | null;
	avatar: string | null;
};

type ProfileState = 'edit' | 'delete';
