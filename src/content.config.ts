import { defineCollection, z } from "astro:content";

const BreachSchema = z.object({
  Name: z.string(),
  Title: z.string(),
  Domain: z.string(),
  BreachDate: z.coerce.date(),
  AddedDate: z.coerce.date(),
  ModifiedDate: z.coerce.date(),
  DataClasses: z.array(z.string()),
  Description: z.string(),
  IsFabricated: z.boolean(),
  IsMalware: z.boolean(),
  IsRetired: z.boolean(),
  IsSensitive: z.boolean(),
  IsSpamList: z.boolean(),
  IsVerified: z.boolean(),
  LogoPath: z.string(),
  PwnCount: z.number(),
});

export type Breach = z.infer<typeof BreachSchema>;

const breaches = defineCollection({
  async loader() {
    const data: Breach[] = await fetch(
      "https://haveibeenpwned.com/api/v3/breaches"
    ).then((r) => r.json());
    return data.map((b: Breach) => ({
      id: b.Name.toLowerCase(),
      ...b,
    }));
  },
  schema: BreachSchema,
});

export const collections = { breaches };
