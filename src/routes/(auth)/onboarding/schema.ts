import { z } from 'zod';

export const onboardSchema = z.object({
	name: z.string().min(4),
	bio: z.string(),
	token: z.string(),
	cid: z.string()
});
