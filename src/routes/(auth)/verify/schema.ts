import { z } from 'zod';

export const verifySchema = z.object({
	otp: z.string().max(6).min(6),
	cid: z.string(),
	u: z.string(),
	tid: z.string()
});
