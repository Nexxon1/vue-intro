Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">

        <div class="product-image">
            <!-- 2. ATTRIBUTE BINDING -->
            <!-- static solution: <img src="./assets/vmSocks-green-onWhite.jpg"> -->
            <!--'v-bind' dynamically binds an attribute to an expression
                 Here we bind to the attribute 'src' to the expression 'socksImage'
                 This works for many other attributes - e.g. href, title, style, disabled, ... -->
            <img v-bind:src="socksImage">
            <!-- There is also a short form for v-bind -> Just prepend ':' -->
            <!-- <img :src="socksImage"> -->
        </div>

        <div class="product-info">
            <!-- 1. THE VUE INSTANCE -->
            <!-- <h1>{{product}}</h1> -->
            <!-- 7. COMPUTED PROPERTIES -->
            <h1>{{title}}</h1>
            <div>
                I can reference the same data here: {{product}}
            </div>
            <!-- 3. CONDITIONAL RENDERING -->
            <!-- 'v-show' just toggles the visibility on and off (adds CSS property 'display: none'-->
            <div class="flex-container">
                <span class="dot" id="green" v-if="inStock"></span>
                <span class="dot" id="red" v-else="inStock"></span>
                <span class="product-stock" v-if="inStock > 10">In Stock</span>
                <span class="product-stock" v-else-if="inStock <= 10 && inStock > 0">Almost sold out</span>
                <span class="product-stock" v-else>Out of Stock</span>
            </div>
            <p>Shipping: {{shipping}}</p>
            <!-- 4. LIST RENDERING -->
            <ul>
                <li v-for="detail in details">{{detail}}</li>
            </ul>
            <!-- With a more complex collection -->
            <!-- The ':key' Attribute is not necessary but highly recommended so Vue can keep track of each
            nodes identity -->
            <!-- 6. class and STYLE BINDING -->
            <!-- Inside the 'style' attribute we are adding an object via the curly brackets '{ }' -->
            <!-- Often it is cleaner to bind to an entire style Object
            e.g.: <span :style="styleObject"></span> Then inside define that css inside the data styleObject of main.js-->
            <div v-for="(variant, index) in variants"
                 :key="variant.variantId"
                 class="color-box"
                 :style="{backgroundColor: variant.variantColor}"
                 @mouseover="updateProduct(index)">
                <!-- The short form for 'v-on' is '@' -->
                <!-- Other common use cases: @click, @submit on a form, @keyup.enter on an input, ... -->
            </div>

            <!-- 5. EVENT HANDLING & 6. CLASS and style BINDING-->
            <!-- 'v-on' listens to the event that you specify afterwards. -->
            <!-- <button v-on:click="cart += 1">Add to Cart</button> -->
            <!-- You can also trigger methods with the 'methods' property of the Vue object. -->
            <button v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{disabledButton: !inStock}">
                Add to Cart
            </button>

        </div>
    </div>
    `,
    // In Components 'data' is a function that returns a data object. (In new Vue it is just a data object)
    // A component always returns a fresh data object. This is needed so you don't automatically have the same data
    // in each component if you use the component several times throughout the app

    // When the component is nested in a parent component you can't access the parents data. (Because its isolated)
    // Instead you can use 'props' - These are custom attributes for passing data into our components

    // In order to receive props a component needs to explicitly declare the props it expects to receive
    data() {
        return {
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
            styleObject: {
                color: 'red'
            }
        }
    },
    methods: {
        addToCart: function () {
            // 9. COMMUNICATING EVENTS
            //Passing Information UP
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        //This is the ES6 short form for anonymous functions
        updateProduct(index) {
            //'this' refers to the cart in the 'data' property
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
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return "2,99"
        }
    }

});

//'new Vue' creates a new Vue instance which is the root of a Vue application
//The Vue instance has a variety of optional properties to store data or perform actions
var app = new Vue({
    //Element property. Connects to the HTML Element with id 'app'
    el: '#app',
    data: {
        premium: true,
        cart: [],
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        }
    }
});