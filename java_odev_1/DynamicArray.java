public class DynamicArray<T> {
    
    private T [] array;
    int index = 0;

    public DynamicArray(){
        array = (T[]) new Object[10];
    }

    public DynamicArray(int size){
        array = (T[]) new Object[size];
    }

    public int size(){
        return index;
    }

    public int getCapacity(){
        return array.length;
    }

    public void add(T item){
        if(array.length == index){
            T [] temp = (T[]) new Object[array.length * 2];
            for(int i=0; i<array.length; i++){
                temp[i] = array[i];
            }
            temp[index] = item;
            array = temp;
        }
        else array[index] = item;
        index += 1;
    }

    private boolean checkIndex(int i){
        if( i >= index) return false;
        return true;
    }

    public T get(int i){
        if(!checkIndex(i)) return null;
        return array[i];
    }

    public T remove(int i){
        if(!checkIndex(i)) return null;
        
        T temp = array[i];
        for(int j=i; j<this.index; j++) array[j] = array[j+1];
        index -= 1;

        return temp;
    }

    public String toString(){
        String res = "";
        for(int i=0; i<index ; i++){
            res += array[i] + " ";
        }
        return res;
    }

    public int indexOf(T item){
        for(int i=0; i<index; i++) if(array[i].equals(item)) return i;
        return -1;
    }

    public int lastIndexOf(T item){
        for(int i=index-1; i>-1; i--) if(array[i].equals(item)) return i;
        return -1;
    }

    public boolean isEmpty(){
        return index == 0;
    }

    public T[] toArray(){
        return array;
    }

    public void clear(){ index = 0; }

    DynamicArray<T> subList(int start, int finish){
        if(finish >= index || start >= index) return null;
        DynamicArray<T> newDynamicArray = new DynamicArray<>(finish - start + 1);
        for(int i=start; i<=finish; i++){
            newDynamicArray.add(array[i]);
        }
        return newDynamicArray;
        
    }

    public boolean contains(T item){
        for(int i=0; i<index; i++) if(array[i].equals(item)) return true;
        return false;
    }

    public void set(int i, T item){ 
        if(!checkIndex(i)) System.out.println("index not found");
        array[i] = item;
    }

    
}
