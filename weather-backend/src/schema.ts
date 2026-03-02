import { z } from "zod";

export const YrEntrySchema = z.object({
  time: z.string(),
  data: z.object({
    instant: z.object({
      details: z.object({
        air_temperature: z.number(),
      }),
    }),
  }),
});

export const YrResponseSchema = z.object({
  properties: z.object({
    timeseries: z.array(YrEntrySchema),
  }),
});

export type YrEntry = z.infer<typeof YrEntrySchema>;
