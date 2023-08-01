import { fetcher } from '$lib/utils';
import {
	archiveResponseSuccess,
	createPostResponseSuccess,
	deletePostResponseSuccess,
	updatePostResponseSuccess,
} from '$lib/zodSchema';
import { error } from '@sveltejs/kit';

/**
 * post 메써드
 */
async function createNewPost({
	title,
	content,
	words_count,
	status = 'private',
	archive_id,
}: Omit<TPost, 'id'>) {
	try {
		const res = await fetcher('/api/post', 'POST', {
			title,
			content,
			words_count,
			archive_id,
			status,
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
		throw error(500, '포스트 공개/비공개 업데이트 에러');
	}
}

async function updatePost({ id, title, content, words_count, archive_id }: Partial<TPost>) {
	try {
		const result = await fetcher('/api/post', 'PATCH', {
			id,
			title,
			content,
			words_count,
			archive_id,
		});
		const { data: updatedPost } = updatePostResponseSuccess.parse(result);

		return updatedPost;
	} catch (e) {
		throw error(500, '포스트 업데이트 에러');
	}
}

async function deletePost(id: number) {
	try {
		const result = await fetcher('/api/post', 'DELETE', {
			id,
		});
		const { success } = deletePostResponseSuccess.parse(result);

		return { success };
	} catch (e) {
		throw error(500, '포스트 삭제 에러');
	}
}

/**
 * archive 메써드
 */

async function createArchive(archive_name: string) {
	const res = await fetcher<TArchive>('/api/archive', 'POST', {
		name: archive_name,
	});
	const { data: newArchive } = archiveResponseSuccess.parse(res);

	return newArchive;
}

async function updateArchive({ id, name }: { id: string; name: string }, index: number) {
	await fetcher('/api/archive', 'PATCH', {
		id,
		name,
	});
}

async function deleteArchive(id: string) {
	const result = await fetcher('/api/archive', 'DELETE', {
		id,
	});
}

export const db = {
	createNewPost,
	updatePublicity,
	updatePost,
	deletePost,
	createArchive,
	updateArchive,
	deleteArchive,
};
