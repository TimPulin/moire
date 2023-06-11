import axiosInstance from '@/helpers/axios-instance';

const getCartMixin = {
  methods: {
    getCart(accessKey = '') {
      return axiosInstance
        .get('/baskets', {
          params: {
            userAccessKey: accessKey,
          },
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
  },
};

export default getCartMixin;
