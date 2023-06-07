const setImgSrcMixin = {
  methods: {
    setImgSrc(colorObjIndex = 0) {
      if (this.product.colors[colorObjIndex].gallery) {
        this.imgSrc = this.product.colors[colorObjIndex].gallery[0].file.url;
      } else {
        this.imgSrc = './img/product-img-temporary.jpg';
      }
    },
  },
};

export default setImgSrcMixin;
