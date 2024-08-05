    /* Cargamos el script luego de que el HTML se inicie por completo */
document.addEventListener('DOMContentLoaded', () => {
    /* constantes */
    const productForm = document.getElementById('product-form');
    const productNameInput = document.getElementById('product-name');
    const productQuantityInput = document.getElementById('product-quantity');
    const inventory = document.getElementById('inventario');
    const INVENTORY_KEY = 'inventario';

    /* Carga del inventario */
    let products = JSON.parse(localStorage.getItem(INVENTORY_KEY)) || [];

    /* Agrega un evento al formulario para manejar el envío de datos */
    productForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = productNameInput.value;
        const quantity = parseInt(productQuantityInput.value);
        addProduct(name, quantity);
        updateInventory();
        productForm.reset();
    });

    /*Función para agregar un producto al inventario, buscando si el producto ya existe, de ser asi incrementar la cantidad*/
    function addProduct(name, quantity) {
        for (let product of products) {
            if (product.name === name) {
                product.quantity += quantity;
                saveInventory(); /*guarda los cambios en localStorage*/
                return;
            }
        }
        products.push({ name, quantity });
        saveInventory();
    }

    /* funcion para actualizar el DOM */
    function updateInventory() {
        inventory.innerHTML = '';
        for (let product of products) {
            const li = document.createElement('li');
            li.textContent = `${product.name} - Cantidad: ${product.quantity}`;
            /* se agrega boton para eliminar algun producto de la lista */
            li.appendChild(createRemoveButton(product.name));
            inventory.appendChild(li);
        }
    }

    /*aca definimos la funcion del boton de eliminar*/
    function createRemoveButton(name) {
        const button = document.createElement('button');
        button.textContent = 'Eliminar';
        button.addEventListener('click', () => {
            /* invoca la funcion eliminar producto */
            removeProduct(name);
            updateInventory();
        });
        return button;
    }

    /* defiinimos la funcion de eliminar producto */
    function removeProduct(name) {
        products = products.filter(product => product.name !== name);
        saveInventory();
    }

    /* Función para guardar el inventario en localStorage */
    function saveInventory() {
        localStorage.setItem(INVENTORY_KEY, JSON.stringify(products));
    }

    updateInventory();
});
