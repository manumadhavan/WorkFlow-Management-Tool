using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Task_app.Models;

namespace Task_app.Data;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AdminMaster> AdminMasters { get; set; }

    public virtual DbSet<TaskMaster> TaskMasters { get; set; }

    public virtual DbSet<TaskProgress> TaskProgresses { get; set; }

    public virtual DbSet<UserMaster> UserMasters { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\Users\\manum\\Documents\\TaskDB.mdf;Integrated Security=True;Connect Timeout=30;Encrypt=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AdminMaster>(entity =>
        {
            entity.HasKey(e => e.AdminId).HasName("PK__admin_ma__43AA414151019C92");

            entity.ToTable("admin_master");

            entity.Property(e => e.AdminId)
                .ValueGeneratedNever()
                .HasColumnName("admin_id");
            entity.Property(e => e.Age).HasColumnName("age");
            entity.Property(e => e.Department)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("department");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("password");
        });

        modelBuilder.Entity<TaskMaster>(entity =>
        {
            entity.HasKey(e => e.TaskId).HasName("PK__task_mas__0492148D1E0E63BB");

            entity.ToTable("task_master");

            entity.Property(e => e.TaskId)
                .ValueGeneratedNever()
                .HasColumnName("task_id");
            entity.Property(e => e.AssignedBy)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("assigned_by");
            entity.Property(e => e.AssignedTo)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("assigned_to");
            entity.Property(e => e.DateOfAssignment)
                .HasColumnType("datetime")
                .HasColumnName("date_of_assignment");
            entity.Property(e => e.Department)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("department");
            entity.Property(e => e.TaskDcr)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("task_dcr");
            entity.Property(e => e.TaskName)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("task_name");
            entity.Property(e => e.TaskProgress)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("task_progress");
            entity.Property(e => e.TaskStatus)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("task_status");
            entity.Property(e => e.TaskTargetdate)
                .HasColumnType("datetime")
                .HasColumnName("task_targetdate");
            entity.Property(e => e.workstatus).HasColumnName("work_status");
            entity.Property(e => e.adminremarks)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("admin_remarks");
        });

        modelBuilder.Entity<TaskProgress>(entity =>
        {
            entity.HasKey(e => new { e.TaskId, e.SubTaskId, e.ProgressDatetime }).HasName("PK__task_pro__CFEC0393A09487DC");

            entity.ToTable("task_progress");

            entity.Property(e => e.TaskId).HasColumnName("task_id");
            entity.Property(e => e.SubTaskId).HasColumnName("sub_task_id");
            entity.Property(e => e.ProgressDatetime)
                .HasColumnType("datetime")
                .HasColumnName("progress_datetime");
            entity.Property(e => e.PercentageOfCompletion)
                .HasColumnType("numeric(5, 2)")
                .HasColumnName("percentage_of_completion");
        });

        modelBuilder.Entity<UserMaster>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__user_mas__B9BE370F0C40C63F");

            entity.ToTable("user_master");

            entity.Property(e => e.UserId)
                .ValueGeneratedNever()
                .HasColumnName("user_id");
            entity.Property(e => e.Age).HasColumnName("age");
            entity.Property(e => e.Department)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("department");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("password");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
