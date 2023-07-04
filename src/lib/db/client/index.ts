import { fetcher } from '$lib/utils';
import { createPostResponseSuccess } from '$lib/zodSchema';
import { error } from '@sveltejs/kit';

/**
 * post 메써드
 */
async function addNewPost({
	title,
	content,
	words_count,
	archive_name,
}: Omit<TPost, 'id' | 'status'>) {
	try {
		const res = await fetcher('/api/post', 'POST', {
			title,
			content,
			words_count,
			archive_name,
		});
		const result = createPostResponseSuccess.parse(res);

		return result;
	} catch (e) {
		throw error(500, '포스트 만들기 실패');
	}
}

async function updatePublicity({ id, status }: Pick<TPost, 'id' | 'status'>) {
	try {
		await fetcher('/api/post', 'PATCH', {
			id,
			status,
		});
	} catch (e) {
		throw error(500, '포스트 공개/비공개 업데이트 실패');
	}
}

/**
 * archive 메써드
 */
async function addArchive(archive_name: string, index: number) {
	await fetcher<TArchive>('/api/archive', 'POST', {
		name: archive_name,
	});
	// todo: 추가 후 스토어에도 반영 archives.updateName(archive_name, index);
}

async function updateArchive({ id, name }: { id: string; name: string }, index: number) {
	await fetcher('/api/archive', 'PATCH', {
		id,
		name,
		// todo: archives.updateName(name, i); 업데이트 후 스토어에도 바로 반영
	});
}

async function deleteArchive(id: string) {
	await fetcher('/api/archive', 'DELETE', {
		id,
	});
}

export const db = {
	addNewPost,
	updatePublicity,
	addArchive,
	updateArchive,
	deleteArchive,
};
