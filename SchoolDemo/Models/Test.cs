using System;
using System.ComponentModel.DataAnnotations;

namespace SchoolDemo.Models
{
    public class Test
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Grade is required")]
        [Range(1, 100, ErrorMessage = "Grade must be between 1 and 100")]
        public int Grade { get; set; }

        [Required(ErrorMessage = "Date is required")]
        public DateTime TestDate { get; set; }

        [Required(ErrorMessage = "Subject is required")]
        public string Subject { get; set; }

        [Required(ErrorMessage = "Student is required")]
        public int StudentId { get; set; }


        public Student Student { get; set; }
    }
}
