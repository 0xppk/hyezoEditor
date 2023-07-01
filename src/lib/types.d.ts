type TIconSetup = 'chevronLeft' | 'chevronRight' | 'pause' | 'user';

type TPost = {
	id: number;
	archive_name: string;
	author_id: string;
	title: string;
	content: string;
	words_count: number;
	created_at: string;
	updated_at?: string | null;
	status: 'public' | 'private';
};
