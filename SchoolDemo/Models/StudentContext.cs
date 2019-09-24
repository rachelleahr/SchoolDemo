using System;
using Microsoft.EntityFrameworkCore;

namespace SchoolDemo.Models
{
    public class StudentContext : DbContext
    {
        public StudentContext(DbContextOptions<StudentContext> options)
            : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Test> Tests { get; set; }
    }
}
