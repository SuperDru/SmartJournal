﻿// <auto-generated />
using System;
using Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Common.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Common.Account", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnName("user_id");

                    b.Property<float>("Amount")
                        .HasColumnName("amount");

                    b.Property<float>("Dept")
                        .HasColumnName("dept");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnName("updated_at");

                    b.HasKey("UserId");

                    b.ToTable("accounts");
                });

            modelBuilder.Entity("Common.AccountHistory", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnName("user_id");

                    b.Property<DateTime>("PerformedAt")
                        .HasColumnName("performed_at");

                    b.Property<float>("DiffAmount")
                        .HasColumnName("diff_amount");

                    b.Property<float>("NewAmount")
                        .HasColumnName("new_amount");

                    b.Property<Guid?>("PaymentId")
                        .HasColumnName("payment_id");

                    b.Property<int>("Type")
                        .HasColumnName("type");

                    b.HasKey("UserId", "PerformedAt");

                    b.ToTable("account_history");
                });

            modelBuilder.Entity("Common.Attendance", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnName("user_id");

                    b.Property<DateTime>("Date")
                        .HasColumnName("date");

                    b.Property<int>("GroupId")
                        .HasColumnName("group_id");

                    b.Property<float>("PaymentAmount")
                        .HasColumnName("payment_amount");

                    b.HasKey("UserId", "Date");

                    b.HasIndex("GroupId");

                    b.ToTable("attendance");
                });

            modelBuilder.Entity("Common.Group", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id");

                    b.Property<int>("Cost")
                        .HasColumnName("cost");

                    b.Property<Guid>("Guid")
                        .HasColumnName("guid");

                    b.Property<string>("Name")
                        .HasColumnName("name");

                    b.HasKey("Id");

                    b.ToTable("groups");
                });

            modelBuilder.Entity("Common.Payment", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnName("user_id");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnName("created_at");

                    b.Property<float>("Amount")
                        .HasColumnName("amount");

                    b.Property<Guid>("Guid")
                        .HasColumnName("guid");

                    b.Property<DateTime>("PaidAt")
                        .HasColumnName("paid_at");

                    b.HasKey("UserId", "CreatedAt");

                    b.ToTable("payments");
                });

            modelBuilder.Entity("Common.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id");

                    b.Property<string>("Name")
                        .HasColumnName("name");

                    b.HasKey("Id");

                    b.ToTable("roles");
                });

            modelBuilder.Entity("Common.Statistics", b =>
                {
                    b.Property<int>("GroupId")
                        .HasColumnName("group_id");

                    b.Property<DateTime>("Date")
                        .HasColumnName("date");

                    b.Property<int>("AttendancePercentage")
                        .HasColumnName("attendance_percentage");

                    b.Property<float>("ExpectedIncome")
                        .HasColumnName("expected_income");

                    b.Property<int>("LessonsAmount")
                        .HasColumnName("lessons_amount");

                    b.Property<int>("PeopleAmount")
                        .HasColumnName("people_amount");

                    b.Property<int>("VisitsAmount")
                        .HasColumnName("visits_amount");

                    b.HasKey("GroupId", "Date");

                    b.ToTable("Statistics");
                });

            modelBuilder.Entity("Common.TrueSchedule", b =>
                {
                    b.Property<int>("GroupId")
                        .HasColumnName("group_id");

                    b.Property<DateTime>("Date")
                        .HasColumnName("date");

                    b.Property<int>("Discount")
                        .HasColumnName("discount");

                    b.Property<bool>("Fixed")
                        .HasColumnName("fixed");

                    b.Property<bool>("Lesson")
                        .HasColumnName("lesson");

                    b.Property<string>("StartTime")
                        .HasColumnName("start_time");

                    b.HasKey("GroupId", "Date");

                    b.ToTable("true_schedule");
                });

            modelBuilder.Entity("Common.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id");

                    b.Property<string>("Email")
                        .HasColumnName("email");

                    b.Property<Guid>("Guid")
                        .HasColumnName("guid");

                    b.Property<string>("Name")
                        .HasColumnName("name");

                    b.Property<string>("Password")
                        .HasColumnName("password");

                    b.Property<string>("Patronymic")
                        .HasColumnName("patronymic");

                    b.Property<string>("PhoneNumber")
                        .HasColumnName("phone_number");

                    b.Property<string>("Surname")
                        .HasColumnName("surname");

                    b.HasKey("Id");

                    b.ToTable("users");
                });

            modelBuilder.Entity("Common.UserGroup", b =>
                {
                    b.Property<int>("GroupId")
                        .HasColumnName("group_id");

                    b.Property<int>("UserId")
                        .HasColumnName("user_id");

                    b.HasKey("GroupId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("user_groups");
                });

            modelBuilder.Entity("Common.UserRole", b =>
                {
                    b.Property<int>("RoleId")
                        .HasColumnName("role_id");

                    b.Property<int>("UserId")
                        .HasColumnName("user_id");

                    b.HasKey("RoleId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("user_roles");
                });

            modelBuilder.Entity("Common.WeekSchedule", b =>
                {
                    b.Property<int>("GroupId")
                        .HasColumnName("group_id");

                    b.Property<bool[]>("Days")
                        .HasColumnName("days");

                    b.Property<int>("Duration")
                        .HasColumnName("duration");

                    b.Property<string[]>("StartTimes")
                        .HasColumnName("start_times");

                    b.HasKey("GroupId");

                    b.ToTable("week_schedule");
                });

            modelBuilder.Entity("Common.Account", b =>
                {
                    b.HasOne("Common.User", "User")
                        .WithOne("Account")
                        .HasForeignKey("Common.Account", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Common.AccountHistory", b =>
                {
                    b.HasOne("Common.User", "User")
                        .WithMany("AccountHistory")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Common.Attendance", b =>
                {
                    b.HasOne("Common.Group", "Group")
                        .WithMany("Attendance")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Common.User", "User")
                        .WithMany("Attendance")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Common.Payment", b =>
                {
                    b.HasOne("Common.User", "User")
                        .WithMany("Payments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Common.Statistics", b =>
                {
                    b.HasOne("Common.Group", "Group")
                        .WithMany("Statistics")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Common.TrueSchedule", b =>
                {
                    b.HasOne("Common.Group", "Group")
                        .WithMany("TrueSchedules")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Common.UserGroup", b =>
                {
                    b.HasOne("Common.Group", "Group")
                        .WithMany("Users")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Common.User", "User")
                        .WithMany("Groups")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Common.UserRole", b =>
                {
                    b.HasOne("Common.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Common.User", "User")
                        .WithMany("Roles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Common.WeekSchedule", b =>
                {
                    b.HasOne("Common.Group", "Group")
                        .WithOne("WeekSchedule")
                        .HasForeignKey("Common.WeekSchedule", "GroupId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
