// penghasilan perbulan
// jumlah tanggungan
// besar daya listrik
// tagihan listrik perbulan
// status kepemilikan rumah

import { Elysia } from 'elysia';

const app = new Elysia();

app.get('/', () => 'Laman utama');

app.post('/ukt', ({ body }) => {
    const data = body as {
        penghasilan: number, 
        statusKepemilikan: number, 
        jumlahTanggungan: number, 
        besarDaya: number, 
        tagihanListrik: number
    };  

    let gaji: number;
    if (data.penghasilan <= 2000000) {
        gaji = 1;
    } else if (data.penghasilan > 2000000 && data.penghasilan <= 3000000) {
        gaji = 2;
    } else if (data.penghasilan > 3000000 && data.penghasilan <= 4500000) {
        gaji = 3;
    } else if (data.penghasilan > 4500000 && data.penghasilan <= 6000000) {
        gaji = 4;
    } else if (data.penghasilan > 6000000 && data.penghasilan <= 10000000) {
        gaji = 5;
    } else {
        gaji = 6;
    }

    // 1 = milik sendiri
    // 2 = sewa
    // 3 = rumah saudara
    let rumah: number;
    if (data.statusKepemilikan === 1) {
        rumah = 1;
    } else if (data.statusKepemilikan === 2) {
        rumah = 2;
    } else {
        rumah = 3;
    }

    let anak: number;
    if (data.jumlahTanggungan === 1) {
        anak = 4;
    } else if (data.jumlahTanggungan === 2 || data.jumlahTanggungan === 3) {
        anak = 3;
    } else if (data.jumlahTanggungan === 4) {
        anak = 2;
    } else {
        anak = 1;
    }

    let daya: number;
    if(data.besarDaya === 450) {
        daya = 1;
    } else if (data.besarDaya === 900) {
        daya = 2;
    } else if (data.besarDaya === 1300) {
        daya = 3;
    } else if (data.besarDaya === 2200) {
        daya = 4;
    } else {
        daya = 5;
    }

    let tagihan: number;
    if (data.tagihanListrik <= 100000) {
        tagihan = 1;
    } else if (data.tagihanListrik > 100000 && data.tagihanListrik <= 200000) {
        tagihan = 2;
    } else if (data.tagihanListrik > 200000 && data.tagihanListrik <= 400000) {
        tagihan = 3;
    } else if (data.tagihanListrik > 400000 && data.tagihanListrik <= 800000) {
        tagihan = 4;
    } else {
        tagihan = 5;
    };


    return {
        gaji,   
        rumah,
        anak,
        daya,
        tagihan
    };
});

