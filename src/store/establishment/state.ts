import { Establishment, Product } from "@/lib/models";

export const state = () => ({
  establishments: [] as Establishment[],
  mostRateds: [] as Establishment[],
  active: {} as Establishment,
  productsMostRateds: [] as Product[]
});
