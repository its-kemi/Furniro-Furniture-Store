// - Material Gallery

document.addEventListener("DOMContentLoaded", function () {

    const gallery = document.querySelector("#materialGallery");

    const materials = [

        {
            name: "Oak Wood",
            type: "Natural Wood",
            image: "assite/Shop-Products-images/MaterialShop-images/oak.png"
        },

        {
            name: "Walnut Wood",
            type: "Premium Wood",
            image: "assite/Shop-Products-images/MaterialShop-images/walnut.png"
        },

        {
            name: "Mahogany",
            type: "Classic Wood",
            image: "assite/Shop-Products-images/MaterialShop-images/mahogany.png"
        },

        {
            name: "Teak Wood",
            type: "Natural Texture",
            image: "assite/Shop-Products-images/MaterialShop-images/teak.png"
        },

        {
            name: "Linen",
            type: "Soft Fabric",
            image: "assite/Shop-Products-images/MaterialShop-images/linen.png"
        },

        {
            name: "Velvet",
            type: "Luxury Fabric",
            image: "assite/Shop-Products-images/MaterialShop-images/velvet.png"
        },

        {
            name: "Cotton",
            type: "Natural Fabric",
            image: "assite/Shop-Products-images/MaterialShop-images/cotton.png"
        },

        {
            name: "Bouclé",
            type: "Textured Fabric",
            image: "assite/Shop-Products-images/MaterialShop-images/boucle.png"
        }

    ];

    materials.forEach(function (material) {

        const item = document.createElement("div");

        item.className = "material-item";

        item.innerHTML = `
            <img src="${material.image}" alt="${material.name}">

            <div class="material-overlay">
                <h3>${material.name}</h3>
                <span>${material.type}</span>
            </div>
        `;

        gallery.appendChild(item);

    });

});