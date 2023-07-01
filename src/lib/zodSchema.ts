import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const postSchema = z.object({
	id: z.number().optional(),
	archive_name: z.string().min(1),
	title: z.string().min(1),
	content: z.string().min(1),
	words_count: z.number(),
	status: z.enum(['public', 'private']).optional(),
});

export const postsSchema = z.array(
	z.object({
		id: z.number().min(1),
		author_id: z.string().uuid(),
		archive_name: z.string().min(1),
		title: z.string().min(1),
		content: z.string().min(1),
		words_count: z.number(),
		status: z.enum(['public', 'private']),
		created_at: z.string(),
		updated_at: z.string().nullish(),
	}),
);

export const idParser = (data: any) =>
	z
		.array(
			z.object({
				id: z.string(),
			}),
		)
		.parse(data);

export const numberIdParser = (data: any) =>
	z
		.array(
			z.object({
				id: z.number(),
			}),
		)
		.parse(data);

export const groupSchema = z.object({
	groupname: z.string().min(1),
});
