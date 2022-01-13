using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Entities
{
    public class Book
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
    
        public string Title { get; set; }

        public int GenreID { get; set; }

        public int PageCount { get; set; }
    
        public DateTime PublishDate { get; set; }
    
        public int ViewCount { get; set; }
    }
}
