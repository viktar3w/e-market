import { Event } from "@prisma/client";

import { SupportEventsByCategoryNameRequest } from "@/lib/validations/support";
export type EventState = {} & Event;
export type EventByNameResponse = {
  events: EventState[];
  eventsCount: number;
  uniqueFieldCount: number;
};
export type EventByNameRequest = SupportEventsByCategoryNameRequest & Record<string, any>;

