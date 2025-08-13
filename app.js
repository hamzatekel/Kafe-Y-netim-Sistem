const masaContainer = document.getElementById('masaContainer');
const siparisEkrani = document.getElementById('siparisEkrani');
const seciliMasaEl = document.getElementById('seciliMasa');
const kategoriListesi = document.getElementById('kategoriListesi');
const urunListesi = document.getElementById('urunListesi');
const siparisUrunleri = document.getElementById('siparisUrunleri');
const toplamFiyatEl = document.getElementById('toplamFiyat');
const odemeAlBtn = document.getElementById('odemeAl');

let aktifMasa = null;
let masalarSiparisleri = {};
let toplamFiyat = 0;

// Menü verileri
const menuler = {
    "Tatlılar": [
        { ad: "Tiramisu", fiyat: 60 },
        { ad: "Muhallebi", fiyat: 40 },
        { ad: "San Sebastian", fiyat: 80 },
        { ad: "Mozaik Pasta", fiyat: 50 },
        { ad: "Güllaç", fiyat: 70 },
        { ad: "Baklava", fiyat: 90 }
    ],
    "Soğuk İçecekler": [
        { ad: "Soda", fiyat: 20 },
        { ad: "Kola", fiyat: 35 },
        { ad: "Limonata", fiyat: 25 },
        { ad: "Su", fiyat: 10 },
        { ad: "Şalgam", fiyat: 30 },
        { ad: "Ayran", fiyat: 15 }
    ],
    "Sıcak İçecekler": [
        { ad: "Çay", fiyat: 10 },
        { ad: "Türk Kahvesi", fiyat: 25 },
        { ad: "Latte", fiyat: 40 },
        { ad: "Americano", fiyat: 35 }
    ],
    "Sandviçler": [
        { ad: "Tavuklu Sandviç", fiyat: 45 },
        { ad: "Ton Balıklı Sandviç", fiyat: 50 },
        { ad: "Kaşarlı Sandviç", fiyat: 40 }
    ]
};

// Masa ekleme
document.getElementById('masaEkle').addEventListener('click', () => {
    const count = masaContainer.querySelectorAll('.masa').length + 1;
    const newMasa = document.createElement('button');
    newMasa.classList.add('masa');
    newMasa.textContent = `Masa ${count}`;
    masaContainer.appendChild(newMasa);
    masaTiklamaOlayi(newMasa);
});

// Masa tıklama
function masaTiklamaOlayi(masaButon) {
    masaButon.addEventListener('click', () => {
        aktifMasa = masaButon.textContent;
        seciliMasaEl.textContent = aktifMasa;
        siparisEkrani.classList.remove('hidden');

        // Mevcut siparişleri yükle
        siparisUrunleri.innerHTML = "";
        toplamFiyat = masalarSiparisleri[aktifMasa]?.toplam || 0;
        toplamFiyatEl.textContent = toplamFiyat;

        if (masalarSiparisleri[aktifMasa]) {
            masalarSiparisleri[aktifMasa].urunler.forEach(u => {
                const li = document.createElement('li');
                li.textContent = `${u.ad} - ${u.fiyat} TL`;
                siparisUrunleri.appendChild(li);
            });
        }

        // Kategorileri göster
        kategoriListesi.innerHTML = "";
        Object.keys(menuler).forEach(kategori => {
            const btn = document.createElement('button');
            btn.textContent = kategori;
            btn.addEventListener('click', () => urunleriGoster(kategori));
            kategoriListesi.appendChild(btn);
        });

        // Varsayılan olarak ilk kategoriyi göster
        urunleriGoster(Object.keys(menuler)[0]);
    });
}

// Ürünleri listele
function urunleriGoster(kategori) {
    urunListesi.innerHTML = "";
    menuler[kategori].forEach(urun => {
        const btn = document.createElement('button');
        btn.textContent = `${urun.ad} - ${urun.fiyat} TL`;
        btn.addEventListener('click', () => urunEkle(urun));
        urunListesi.appendChild(btn);
    });
}

// Ürün ekleme
function urunEkle(urun) {
    if (!masalarSiparisleri[aktifMasa]) {
        masalarSiparisleri[aktifMasa] = { urunler: [], toplam: 0 };
    }
    masalarSiparisleri[aktifMasa].urunler.push(urun);
    masalarSiparisleri[aktifMasa].toplam += urun.fiyat;

    toplamFiyat = masalarSiparisleri[aktifMasa].toplam;
    toplamFiyatEl.textContent = toplamFiyat;

    const li = document.createElement('li');
    li.textContent = `${urun.ad} - ${urun.fiyat} TL`;
    siparisUrunleri.appendChild(li);
}

// Ödeme alma
odemeAlBtn.addEventListener('click', () => {
    if (aktifMasa) {
        alert(`${aktifMasa} için ${toplamFiyat} TL tahsil edildi.`);
        masalarSiparisleri[aktifMasa] = { urunler: [], toplam: 0 };
        siparisUrunleri.innerHTML = "";
        toplamFiyatEl.textContent = "0";
    }
});

// Var olan masalara tıklama ekle
document.querySelectorAll('.masa').forEach(masaTiklamaOlayi);
