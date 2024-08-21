document.addEventListener('DOMContentLoaded', () => {
    /* constantes */
    const productForm = document.getElementById('product-form');
    const productNameInput = document.getElementById('product-name');
    const productQuantityInput = document.getElementById('product-quantity');
    const inventory = document.getElementById('inventario');
    const INVENTORY_KEY = 'inventario';

    let products = JSON.parse(localStorage.getItem(INVENTORY_KEY)) || [];
    let editingProductName = null; /* Para saber qué producto estamos editando */

    /* Función para agregar un producto al inventario, buscando si el producto ya existe, de ser así incrementar la cantidad */
    function addProduct(name, quantity) {
        const existingProduct = _.find(products, { name: name });
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            products.push({ name, quantity });
        }
        saveInventory(); /* guarda los cambios en localStorage */
    }

    /* Función para eliminar un producto */
    function removeProduct(name) {
        products = products.filter(product => product.name !== name);
        saveInventory();
    }

    /* Función para actualizar el DOM */
    function updateInventory() {
        inventory.innerHTML = '';
        for (let product of products) {
            const li = document.createElement('li');
            li.textContent = `${product.name} - Cantidad: ${product.quantity}`;
            /* Botón para eliminar algún producto de la lista */
            li.appendChild(createRemoveButton(product.name));
            /* Se agrega botón para editar algún producto de la lista */
            li.appendChild(createEditButton(product.name, product.quantity));
            inventory.appendChild(li);
        }
    }

    /* Función para crear el botón de eliminar */
    function createRemoveButton(name) {
        const button = document.createElement('button');
        button.textContent = 'Eliminar';
        button.addEventListener('click', () => {
            removeProduct(name);
            updateInventory();
        });
        return button;
    }

    /* Función para crear el botón de editar */
    function createEditButton(name, quantity) {
        const button = document.createElement('button');
        button.textContent = 'Editar';
        button.addEventListener('click', () => {
            if (editingProductName) {
                alert('Completa o cancela la edición del producto actual primero.');
                return;
            }
            productNameInput.value = name;
            productQuantityInput.value = quantity;
            editingProductName = name;
            productForm.querySelector('button').textContent = 'Guardar Cambios'; // Cambia el texto del botón
        });
        return button;
    }

    /* Función para guardar el inventario en localStorage */
    function saveInventory() {
        localStorage.setItem(INVENTORY_KEY, JSON.stringify(products));
    }

    /* Función para cargar productos desde un JSON local */
    async function loadProductsFromJSON() {
        try {
            const response = await fetch('products.json');
            if (!response.ok) throw new Error('Error al cargar el JSON local');
            const data = await response.json();
            data.forEach(item => {
                addProduct(item.name, item.quantity);
            });
            updateInventory();
        } catch (error) {
            console.error('Error al cargar el JSON local:', error);
        }
    }

    /* Función para manejar el envío del formulario */
    function handleFormSubmit(event) {
        event.preventDefault();

        const name = productNameInput.value;
        const quantity = parseInt(productQuantityInput.value);

        if (editingProductName) {
            /* Editar producto existente */
            removeProduct(editingProductName);
            addProduct(name, quantity);
            editingProductName = null;
            productForm.querySelector('button').textContent = 'Agregar Producto';
        } else {
            /* Agregar nuevo producto */
            addProduct(name, quantity);
        }

        updateInventory();
        productForm.reset();
    }

    /* Asignar manejador al formulario */
    productForm.addEventListener('submit', handleFormSubmit);


    loadProductsFromJSON();
    updateInventory();
});

