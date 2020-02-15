const product = 'Socks';


//'new Vue' creates a new Vue instance which is the root of a Vue application
//The Vue instance has a variety of optional properties to store data or perform actions
var app = new Vue({
    //Element property. Connects to the HTML Element with id 'app'
    el: '#app',
    data: {
        //Vue is reactive - if this value changes the according HTML places change too
        //The instance data is linked to every place that data is being referenced in the HTML
        product: 'Socks',
        brand: 'Gucci',
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        selectedVariant: 0, //Based on the index of the variants list
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: './assets/vmSocks-green-onWhite.jpg',
                variantQuantity: 11
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: './assets/vmSocks-blue-onWhite.jpg',
                variantQuantity: 0
            }
        ],
        cart: 0,
        styleObject: {
            color: 'red'
        }
    },
    methods: {
        addToCart: function () {
            //'this' refers to the cart in the 'data' property
            this.cart += 1
        },
        //This is the ES6 short form for anonymous functions
        updateProduct(index) {
            this.selectedVariant = index;
            console.log('Image index: ' + index)
        }
    },
    // Computed Properties are cached - The result is saved until its properties (here brand or product) change.
    // For expensive operations that you dont want to rerun every time you access it you should use computed properties
    // instead of a method
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        socksImage() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        }
    }
});