"""
2- Verilen listenin içindeki elemanları tersine döndüren bir fonksiyon yazın. 
Eğer listenin içindeki elemanlar da liste içeriyorsa onların elemanlarını da tersine döndürün. 
Örnek olarak:

input: [[1, 2], [3, 4], [5, 6, 7]]

output: [[[7, 6, 5], [4, 3], [2, 1]]
"""
def reverseList(x):
    if str(type(x)) != "<class 'list'>":
        return x
    x.reverse()
    for i in range(len(x)):
        x[i] = reverseList(x[i])
    return x

i = [[1, 2], [3, 4], [5, 6, 7]]
print("input:",i)
print("output:",reverseList(i))