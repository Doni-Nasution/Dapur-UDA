document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'Paket Nasi + Rendang', img: 'paket 1.jpg', price: 17000, diskon: 25000 },
            { id: 2, name: 'Paket Nasi + Ayam Bakar', img: 'ayam bakar.jpg', price: 15000, diskon: 20000 },
            { id: 3, name: 'Paket Nasi + Ikan Bakar', img: 'ikan bakar.jpg', price: 15000, diskon: 20000 },
            { id: 4, name: 'Paket Nasi Hemat', img: 'hemat.jpg', price: 10000, diskon: 15000 },
            { id: 5, name: 'Ayam Bakar', img: 'ayam-bakar.jpg', price: 10000, diskon: 13000 },
            { id: 6, name: 'Ikan Bakar', img: 'ikan bakar.jpg', price: 10000, diskon: 13000 },
            { id: 7, name: 'Kepala Kakap', img: 'kepala-kakap.jpg', price: 13000, diskon: 17000 },
            { id: 8, name: 'Gulai Nangka', img: 'gulai-nangka.jpg', price: 5000, diskon: 8000 },
            { id: 9, name: 'Nasi', img: 'nasi.jpg', price: 3000, diskon: 5000 },
        ],
        
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity:0,
        add(newItem) {
            // cek ada yang sama atau tidak 
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // jika belum ada / kosong
                if(!cartItem){
                    this.items.push({...newItem, quantity: 1, total: newItem.price });
                    this.quantity++;
                    this.total += newItem.price;
                    // console.log(this.total);
                } else {
                    // jika barang sudah ada / cek barang beda atau sama
                    this.items = this.items.map((item) => {
                        // jka barang beda
                        if (item.id !== newItem.id) {
                            return item;
                        } else {
                            // jika sudah ada = tambah jumlah dan total
                            item.quantity++;
                            item.total = item.price * item.quantity;
                            this.quantity++;
                            this.total += item.price;
                            return item;
                        }

                    });
                }

        },
        remove(id) {
            // ambil item yang mau di remove berdasarkan id
            const cartItem = this.items.find((item) => item.id === id);


            // jika item lebih dari 1
            if(cartItem.quantity > 1) {
                // telusuri 1 1
                this.items = this.items.map((item) => {
                    // jika bukan barang yang di clik
                    if(item.id !== id){
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }

                })

            } else if (cartItem.quantity === 1 ){
                // jika barang sisa 1
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        }
    });

});

// form falidationm
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true ;

const form = document.querySelector('#checkoutForm');

form.addEventListener('keyup', function() {
    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].value.length !== 0) {
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        } else {
            return false;
        }
    }
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
});

// kirim data ketika tombol ckout di clik
checkoutButton.addEventListener('click', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    const message = formatMessage(objData);
    window.open('http://wa.me/6281399930069?text=' + encodeURIComponent(message));
});

// format pesan wassap
const formatMessage = (obj) => {
    return `Data Customer
    Nama : ${obj.name}
    Email : ${obj.email}
    No HP : ${obj.phone}
Data Pesanan
${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`)}
TOTAL: ${rupiah(obj.total)}
    Terima Kasih`;
};

// konversi ke rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style : 'currency',
        currency : 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};