print("Kalkulator dengan eval")
print("Masukkan perhitungan seperti: 2+3*4")

while True:
    try:
        ekspresi = input("Masukkan perhitungan (atau 'q' untuk keluar): ")
        if ekspresi.lower() == 'q':
            break
        if all(c in '0123456789+-*/. ()' for c in ekspresi):
            hasil = eval(ekspresi)
            print(f"Hasil: {hasil}")
        else:
            print("Input mengandung karakter tidak valid")
    except:
        print("Input tidak valid")

print("Kalkulator ditutup")