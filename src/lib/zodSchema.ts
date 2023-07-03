import { z } from 'zod';

declare global {
	type TPost = z.infer<typeof postSchema>;
	type TArchive = z.infer<typeof archiveSchema>;
	type TPostStatus = z.infer<typeof statusSchema>;
}

export const statusSchema = z.enum(['public', 'private']);

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const postSchema = z.object({
	id: z.number(),
	archive_name: z.string().min(1),
	title: z.string().min(1),
	content: z.string().min(1),
	words_count: z.number(),
	status: statusSchema,
});
export const postsSchema = z.array(postSchema);
export const createPostResponseSuccess = z.object({
	data: postSchema.pick({ id: true }),
	success: z.boolean(),
});
export const updatePostResponseSuccess = z.object({
	data: postSchema,
	success: z.boolean(),
});

export const archiveSchema = z.object({
	id: z.string().uuid(),
	author_id: z.string().uuid(),
	group_id: z.string().uuid().nullable(),
	name: z.string().min(1),
	status: statusSchema,
	created_at: z.string(),
	updated_at: z.string().nullable(),
	start_date: z.string().nullable(),
	due_date: z.string().nullable(),
	word_goal: z.number().nullable(),
});
export const archivesSchema = z.array(archiveSchema);
export const archiveResponseSuccess = z.object({
	message: z.string(),
	success: z.boolean(),
});
export const groupSchema = z.object({
	groupname: z.string().min(1),
});

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
