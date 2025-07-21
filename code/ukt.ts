// penghasilan perbulan
// jumlah tanggungan
// besar daya listrik
// tagihan listrik perbulan
// status kepemilikan rumah

import { Elysia } from 'elysia';

const app = new Elysia();

class Faktor {
    skorGaji: number;
    skorRumah: number;
    skorAnak: number;
    skorDaya: number;
    skorTagihan: number;

    constructor(
        gaji: number,
        rumah: number,
        tanggungan: number,
        daya: number,
        tagihan: number,
    ) {
        this.skorGaji = this.hitungGaji(gaji);
        this.skorRumah = this.hitungRumah(rumah);
        this.skorAnak = this.hitungAnak(tanggungan);
        this.skorDaya = this.hitungDaya(daya);
        this.skorTagihan = this.hitungTagihan(tagihan);
    };

    hitungGaji(gaji: number): number {
        if (gaji <= 2000000) return 1;
        if (gaji <= 3000000) return 2;
        if (gaji <= 4500000) return 3;
        if (gaji <= 6000000) return 4;
        if (gaji <= 10000000) return 5;
        return 6;
    };

    hitungRumah(rumah: number): number {
        if (rumah === 1) return 3;
        if (rumah === 2) return 2;
        return 1;
    };

    hitungAnak(anak: number): number {
        if (anak === 1) return 4;
        if (anak === 2 || anak === 3) return 3;
        if (anak === 4) return 2;
        return 1;
    };

    hitungDaya(daya: number): number {
        if (daya === 450) return 1;
        if (daya === 900) return 2;
        if (daya === 1300) return 3;
        if (daya === 2200) return 4;
        return 5;
    };

    hitungTagihan(tagihan: number): number {
        if (tagihan <= 100000) return 1;
        if (tagihan > 100000 && tagihan <= 200000) return 2;
        if (tagihan > 200000 && tagihan <= 400000) return 3;
        if (tagihan > 400000 && tagihan <= 800000) return 4;
        return 5;
    }

    hitungSkor():number {
        return (
            this.skorGaji * 0.4 +
            this.skorRumah * 0.2 +
            this.skorAnak * 0.2 +
            this.skorDaya * 0.1 +
            this.skorTagihan * 0.1
        );
    }

    golonganUKT():string {
        const skor = this.hitungSkor();
        if (skor <= 5) return 'UKT G.1'
        if (skor <= 10) return 'UKT G.2';
        if (skor <= 15) return 'UKT G.3';
        if (skor <= 20) return 'UKT G.4';
        if (skor <= 25) return 'UKT G.5';
        return 'UKT G.6';
    }
};


app.get('/', () => 'Laman utama');

app.post('/ukt', ({ body }) => {
    const data = body as {
        gaji: number, 
        rumah: number, 
        tanggungan: number, 
        daya: number, 
        tagihan: number
    };  

    const faktor = new Faktor(
        data.gaji,
        data.rumah,
        data.tanggungan,
        data.daya,
        data.tagihan
    );

    return {
        skorAkhir: faktor.hitungSkor(),
        ukt: faktor.golonganUKT()
    };  
});