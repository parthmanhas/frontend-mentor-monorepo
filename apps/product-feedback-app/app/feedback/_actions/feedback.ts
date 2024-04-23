'use server';

import { z } from "zod";

const addFeedbackSchema = z.object({
    title: z.string(),
    feedback: z.string()
})

export async function addFeedback(formData: FormData) {
    console.log(formData);
}