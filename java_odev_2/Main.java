package java_odev_2;

import java.util.TreeSet;

public class Main {
    public static void main(String[] args) {
        TreeSet<Book> dict = new TreeSet<>();
        dict.add(new Book("a"));
        dict.add(new Book("z"));
        dict.add(new Book("d"));
        dict.add(new Book("c"));
        dict.add(new Book("b"));

        for(Book b: dict) System.out.println(b.getBookName());

    }
}
