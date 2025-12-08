const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
}); 

 document.addEventListener('DOMContentLoaded', () => {
    const VAT_RATE = 0.12; 
    
    const updateCartSummary = () => {
        const allItems = document.querySelectorAll('.cart-item');
        let totalQuantity = 0;
        let subtotal = 0;

        allItems.forEach(item => {
            const quantityText = item.querySelector('.qty').textContent.trim();
            const quantity = parseInt(quantityText);

            const priceString = item.getAttribute('data-unit-price');
            const unitPrice = parseFloat(priceString); 
            
            const safeQuantity = isNaN(quantity) ? 0 : quantity;
            const safeUnitPrice = isNaN(unitPrice) ? 0 : unitPrice;

            totalQuantity += safeQuantity;
            subtotal += safeQuantity * safeUnitPrice;
        });
        const vatAmount = subtotal * (VAT_RATE / (1 + VAT_RATE)); 
        
        const formatNumber = (num) => {
            if (isNaN(num) || num < 0) return '0,00'; 
            return num.toFixed(2).replace('.', ',');
        };

        document.querySelector('.total-sum').textContent = `${formatNumber(subtotal)} SEK`;
        document.querySelector('.vat').textContent = `${formatNumber(vatAmount)} SEK`;
        
        const bagCountElement = document.querySelector('.bag-item-count');
        if (bagCountElement) {
            bagCountElement.textContent = totalQuantity;
        }
    };

    document.querySelectorAll('.cart-item').forEach(item => {
        const priceLine = item.querySelector('.price-line');
        const minusBtn = item.querySelector('.minus');
        const plusBtn = item.querySelector('.plus');
        const quantitySpan = item.querySelector('.qty');

        const unitPrice = item.getAttribute('data-unit-price') || 'XX';
        
        let currentQuantity = parseInt(quantitySpan.textContent.trim());
        const updateItemDisplay = () => {
            priceLine.textContent = `${currentQuantity} × ${unitPrice}:-`; 
            quantitySpan.textContent = currentQuantity;
            updateCartSummary(); 
        };
        priceLine.addEventListener('click', () => {
            item.classList.add('is-editing');
        });

        plusBtn.addEventListener('click', () => {
            currentQuantity++;
            updateItemDisplay();
        });

        minusBtn.addEventListener('click', () => {
            if (currentQuantity > 0) {
                currentQuantity--;
                updateItemDisplay();
            } else if (currentQuantity === 1) {
                item.classList.remove('is-editing'); 
            }
        });
        updateItemDisplay();
    });
});