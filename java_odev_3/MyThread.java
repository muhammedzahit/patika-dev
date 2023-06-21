import java.util.ArrayList;
import java.util.List;

public class MyThread extends Thread {
    public static ArrayList<Integer> oddNums = new ArrayList<>();
    public static ArrayList<Integer> evenNums = new ArrayList<>();
    static Object oddLock = new Object();    
    static Object evenLock = new Object();

    public List<Integer> array;

    public MyThread(List<Integer> array){ this.array = array; }

    @Override
    public void run() {
        for(int i=0; i<array.size(); i++){
            if(array.get(i) % 2 == 0){
                synchronized(oddLock){
                    evenNums.add(array.get(i));
                }
            }
            else{
                synchronized(evenLock) {oddNums.add(array.get(i)); }
            }
        }
    }
    
    
}
