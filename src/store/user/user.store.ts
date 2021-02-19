import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export interface User {
  name: string;
  email: string;
  cpf: string;
  password: string;
  role: any;
  address: {
    street: string;
    district: string;
    streetNumber: number;
    complement: string;
    city: string;
    state: string;
    zipcode: string;
    reference: string;
    establishment: {
      name: string;
      phone: string;
      imageUrl: string;
      products: [
        {
          name: string;
          description: string;
          price: number;
          originalPrice: number;
          available: boolean;
          imageUrl: string;
          category: {
            name: string;
            products: [];
          };
          invoices: [];
          reviews: [];
        }
      ];
      reviews: [];
    };
  };
  phone: string;
  invoices: [
    {
      total: number;
      discount: number;
      paymentStatus: any;
      paymentMethod: any;
      paymentDate: Date;
      products: [
        {
          name: string;
          description: string;
          price: number;
          originalPrice: number;
          available: boolean;
          imageUrl: string;
          category: {
            name: string;
            products: [];
          };
          invoices: [];
          reviews: [];
        }
      ];
    }
  ];
  cards: [
    {
      card_id: string;
      method: any;
    }
  ];
  reviews: [
    {
      establishment: {
        name: string;
        phone: string;
        imageUrl: string;
        products: [
          {
            name: string;
            description: string;
            price: number;
            originalPrice: number;
            available: boolean;
            imageUrl: string;
            category: {
              name: string;
              products: [];
            };
            invoices: [];
            reviews: [];
          }
        ];
        reviews: [];
      };
      product: {
        name: string;
        description: string;
        price: number;
        originalPrice: number;
        available: boolean;
        imageUrl: string;
        category: {
          name: string;
          products: [];
        };
        invoices: [];
        reviews: [];
      };
      comment: string;
      stars: number;
    }
  ];
}

export default {
  namespaced: true,
  state: {
    user: {} as User
  },
  mutations: {
    setUser(state: any, payload: User) {
      state.user = payload;
    }
  },
  actions: {
    setUser({ commit }: any, payload: User) {
      commit("setUser", payload);
    }
  },
  getters: {
    getUser(state: any): User {
      return state.user;
    }
  }
};
