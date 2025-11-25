import z from "zod";

export const OrganizationInputSchema = z.object({
    shortName: z.string(),
    longName: z.string(),
    code: z.string(),
});
export type OrganizationInput = z.infer<typeof OrganizationInputSchema>;

export interface Organization {
    ID: number;
    shortName: string;
    longName: string;
    code: string;
}