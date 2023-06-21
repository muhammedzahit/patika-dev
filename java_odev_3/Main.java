import java.util.ArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        ArrayList<Integer> array = new ArrayList<>();
        for(int i=0; i<100000; i++) array.add(i+1);

        int interval = array.size() / 4;
        
        ExecutorService executor = Executors.newFixedThreadPool(10);

        for(int i=0; i<array.size(); i+=interval){
            executor.execute(new MyThread( array.subList(i, i+interval) ));
        }

        executor.shutdown();

        if(!executor.awaitTermination(60, TimeUnit.SECONDS)){
            System.out.println("Threadler tamamlanamadı .... ");
        }

        System.out.println(MyThread.oddNums.size() + " " + MyThread.oddNums.get(0) + " " + MyThread.oddNums.get(MyThread.oddNums.size() - 1));
        System.out.println(MyThread.evenNums.size() + " " + MyThread.evenNums.get(0) + " " + MyThread.evenNums.get(MyThread.evenNums.size() - 1));
    }
}
