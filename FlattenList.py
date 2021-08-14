"""
1- Bir listeyi düzleştiren (flatten) fonksiyon yazın. 
Elemanları birden çok katmanlı listtlerden ([[3],2] gibi) oluşabileceği gibi, 
non-scalar verilerden de oluşabilir. Örnek olarak:

input: [[1,'a',['cat'],2],[[[3]],'dog'],4,5]

output: [1,'a','cat',2,3,'dog',4,5]
"""

def flattenList(x):
    k, i = len(x), 0
    while i < k:
        if str(type(x[i])) == "<class 'list'>":
            for j in range(len(x[i]) - 1, -1, -1):
                x.insert(i+1,x[i][j])
                k += 1
            x.pop(i)
            k -= 1
            i -= 1
        i += 1
    return x

i = [[1,'a',['cat'],2],[[[3]],'dog'],4,5]
print("input:",i)
print("output:",flattenList(i))