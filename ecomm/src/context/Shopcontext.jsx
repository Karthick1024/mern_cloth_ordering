// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import React, { createContext, useEffect, useState } from "react";


// export const Shopcontext  = createContext(null);

// const getDefaultCart = () => {
//     let cart = {};
//     for (let index = 0; index < 300 + 1; index++){
//         cart[index] = 0;
//     }
//     return cart;
// }

// const ShopcontextProvider = (props) =>{

//     const [all_product,setAll_product] = useState([]);
    
//     const [cartItems,setCartItems] = useState(getDefaultCart());


//     useEffect(() => {
//         // Fetch all products
//         fetch('http://localhost:4000/allproducts')
//           .then((response) => response.json())
//           .then((data) => setAll_product(data))
//           .catch((err) => console.error('Error fetching products:', err));
      
//         // Fetch cart items if auth-token exists
//         if (localStorage.getItem('auth-token')) {
//           fetch('http://localhost:4000/getcart', {
//             method: 'POST',
//             headers: {
//               'Accept': 'application/json',  // Corrected the content type
//               'auth-token': `${localStorage.getItem('auth-token')}`,
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({}),  // You can send an empty object or remove this if unnecessary
//           })
//             .then((response) => response.json())
//             .then((data) => setCartItems(data))
//             .catch((err) => console.error('Error fetching cart:', err));
//         }
//       }, []);
      

    
//     const addToCart = (itemId) => {
//         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
//         // console.log(cartItems);
//         if(localStorage.getItem('auth-token')){
//             fetch('http://localhost:4000/addtocart',{
//                 method:'POST',
//                 headers:{
//                     Accept:'application/form-data',
//                     'auth-token':`${localStorage.getItem('auth-token')}`,
//                     'Content-Type':'application/json',
//                 },
//                 body:JSON.stringify({"itemId":itemId}),
//             })
//             .then((response)=>response.json())
//             .then((data)=>console.log(data));
//         }
        
//     }
   
//     const removeFromCart = (itemId) => {
//         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
//         if(localStorage.getItem('auth-token')){
//             fetch('http://localhost:4000/removefromcart',{
//                 method:'POST',
//                 headers:{
//                     Accept:'application/form-data',
//                     'auth-token':`${localStorage.getItem('auth-token')}`,
//                     'Content-Type':'application/json',
//                 },
//                 body:JSON.stringify({"itemId":itemId}),
//             })
//             .then((response)=>response.json())
//             .then((data)=>console.log(data));
//         }
//     }
   
//     const getTotalCartAmount = () => {
//         let totalAmount = 0;
//         for (const item in cartItems) {
//             if (cartItems[item] > 0) {
//                 let itemInfo = all_product.find((product) => product.id === Number(item));
//                 if (itemInfo && itemInfo.new_price) {
//                     totalAmount += cartItems[item] * itemInfo.new_price;
//                 }
//             }
//         }
//         return totalAmount;
//     };
    
//     const getTotalCartItems = ()=> {
//         let totalItem = 0;
//         for(const item in cartItems){
//             if(cartItems[item]>0){
//                 totalItem += cartItems[item];
//             }
//         }
//         return totalItem
//     };
//     const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};


//     return (
//         <Shopcontext.Provider value={contextValue}>
//             {props.children}
//         </Shopcontext.Provider>
//     )
// }

// export default ShopcontextProvider

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useEffect, useState } from "react";

export const Shopcontext = createContext(null);

// Default cart setup function
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopcontextProvider = (props) => {
    const [all_product, setAll_product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    const API_BASE_URL = 'https://mern-cloth-ordering-website.onrender.com';  // Set the deployed backend URL

    useEffect(() => {
        // Fetch all products
        fetch(`${API_BASE_URL}/allproducts`)
            .then((response) => response.json())
            .then((data) => setAll_product(data))
            .catch((err) => console.error('Error fetching products:', err));

        // Fetch cart items if auth-token exists
        if (localStorage.getItem('auth-token')) {
            fetch(`${API_BASE_URL}/getcart`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',  // Corrected the content type
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),  // You can send an empty object or remove this if unnecessary
            })
                .then((response) => response.json())
                .then((data) => setCartItems(data))
                .catch((err) => console.error('Error fetching cart:', err));
        }
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch(`${API_BASE_URL}/addtocart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data));
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch(`${API_BASE_URL}/removefromcart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((response) => response.json())
                .then((data) => console.log(data));
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo && itemInfo.new_price) {
                    totalAmount += cartItems[item] * itemInfo.new_price;
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };

    return (
        <Shopcontext.Provider value={contextValue}>
            {props.children}
        </Shopcontext.Provider>
    );
};

export default ShopcontextProvider;
