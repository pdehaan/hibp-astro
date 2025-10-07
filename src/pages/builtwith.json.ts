import type { APIRoute } from "astro";
import { z } from "astro:content";

export const prerender = false;

const getQuerySchema = z.object({
  name: z.string(),
  id: z.coerce
    .number()
    .refine((val) => val >= 0, "`id` must be a positive number"),
});

/**
 * The following endpoint, /builtwith.json, expects the following query parameters:
 * - name [string]
 * - id [number] A positive number
 */
export const GET: APIRoute = async function getHandler({ params, request }) {
  const url = new URL(request.url);
  const searchParams = getQuerySchema.parse(
    Object.fromEntries(url.searchParams.entries())
  );
  // I think the `params` only works if we are using dynamic routing.
  console.log({ params });
  console.log({ request });
  console.log({ searchParams });
  return new Response(
    JSON.stringify({
      generator: "I dont think `Apollo.generator` is in scope for .ts files.",
      ...searchParams,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const POST: APIRoute = async ({ params, request }) => {
  return new Response("OK Bro");
};
