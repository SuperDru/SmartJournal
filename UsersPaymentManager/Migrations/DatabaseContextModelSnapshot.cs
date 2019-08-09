﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using UsersPaymentManager.Database;

namespace UsersPaymentManager.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("UsersPaymentManager.Database.Entities.Account", b =>
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

            modelBuilder.Entity("UsersPaymentManager.Database.Entities.Attendance", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnName("user_id");

                    b.Property<DateTime>("Date")
                        .HasColumnName("date");

                    b.Property<bool>("Dept")
                        .HasColumnName("dept");

                    b.Property<int>("GroupId")
                        .HasColumnName("group_id");

                    b.Property<float>("PaymentAmount")
                        .HasColumnName("payment_amount");

                    b.HasKey("UserId", "Date");

                    b.HasIndex("GroupId");

                    b.ToTable("attendance");
                });

            modelBuilder.Entity("UsersPaymentManager.Database.Entities.Group", b =>
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

            modelBuilder.Entity("UsersPaymentManager.Database.Entities.Payment", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnName("user_id");

                    b.Property<DateTime>("Payday")
                        .HasColumnName("paid_at");

                    b.Property<float>("Amount")
                        .HasColumnName("amount");

                    b.HasKey("UserId", "Payday");

                    b.ToTable("payments");
                });

            modelBuilder.Entity("UsersPaymentManager.Database.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id");

                    b.Property<string>("Name")
                        .HasColumnName("name");

                    b.HasKey("Id");

                    b.ToTable("roles");
                });

            modelBuilder.Entity("UsersPaymentManager.Database.Entities.TrueSchedule", b =>
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

            modelBuilder.Entity("UsersPaymentManager.Database.Entities.User", b =>
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

            modelBuilder.Entity("UsersPaymentManager.Database.Entities.UserGroup", b =>
                {
                    b.Property<int>("GroupId")
                        .HasColumnName("group_id");

                    b.Property<int>("UserId")
                        .HasColumnName("user_id");

                    b.HasKey("GroupId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("user_groups");
                });

            modelBuilder.Entity("UsersPaymentManager.Database.Entities.UserRole", b =>
                {
                    b.Property<int>("RoleId")
                        .HasColumnName("role_id");

                    b.Property<int>("UserId")
                        .HasColumnName("user_id");

                    b.HasKey("RoleId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("user_roles");
                });

            modelBuilder.Entity("UsersPaymentManager.Database.Entities.WeekSchedule", b =>
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

            modelBuilder.Entity("UsersPaymentManager.Database.Entities.Account", b =>
                {
                    b.HasOne("UsersPaymentManager.Database.Entities.User", "User")
                        .WithOne("Account")
                        .HasForeignKey("UsersPaymentManager.Database.Entities.Account", "UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("UsersPaymentManager.Database.Entities.Attendance", b =>
                {
                    b.HasOne("UsersPaymentManager.Database.Entities.Group", "Group")
                        .WithMany("Attendance")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("UsersPaymentManager.Database.Entities.User", "User")
                        .WithMany("Attendance")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("UsersPaymentManager.Database.Entities.Payment", b =>
                {
                    b.HasOne("UsersPaymentManager.Database.Entities.User", "User")
                        .WithMany("Payments")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("UsersPaymentManager.Database.Entities.TrueSchedule", b =>
                {
                    b.HasOne("UsersPaymentManager.Database.Entities.Group", "Group")
                        .WithMany("TrueSchedules")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("UsersPaymentManager.Database.Entities.UserGroup", b =>
                {
                    b.HasOne("UsersPaymentManager.Database.Entities.Group", "Group")
                        .WithMany("Users")
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("UsersPaymentManager.Database.Entities.User", "User")
                        .WithMany("Groups")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("UsersPaymentManager.Database.Entities.UserRole", b =>
                {
                    b.HasOne("UsersPaymentManager.Database.Entities.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("UsersPaymentManager.Database.Entities.User", "User")
                        .WithMany("Roles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("UsersPaymentManager.Database.Entities.WeekSchedule", b =>
                {
                    b.HasOne("UsersPaymentManager.Database.Entities.Group", "Group")
                        .WithOne("WeekSchedule")
                        .HasForeignKey("UsersPaymentManager.Database.Entities.WeekSchedule", "GroupId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
