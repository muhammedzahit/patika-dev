package java_odev_2;

public class Book implements Comparable{
    private String bookName;

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public Book(String bookName) {
        this.bookName = bookName;
    }
    
    @Override
    public int compareTo(Object o) {
        Book book = (Book) o;
        return this.bookName.compareTo(book.getBookName());
    } 
}
