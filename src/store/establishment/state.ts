import { Establishment, Product } from "@/lib/models";

export const state = () => ({
  establishments: [] as Establishment[],
  suggestions: [] as Establishment[],
  mostRateds: [] as Establishment[],
  active: {} as Establishment,
  productsMostRateds: [] as Product[],
  myEstablishments: [] as Establishment[]
});
