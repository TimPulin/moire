const loadingProcessMixin = {
  data() {
    return {
      pageIsLoaded: true,

      productsIsLoading: false,
      productsIsLoaded: true,
      productsLoadFault: false,
    };
  },
  methods: {
    setProductLoadingVars(isLoading, isLoaded, loadFault) {
      this.productsIsLoading = isLoading;
      this.productsIsLoaded = isLoaded;
      this.productsLoadFault = loadFault;
    },
  },
};

export default loadingProcessMixin;
