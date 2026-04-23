using LuminaStudio.Domain.Entities.Booking;
using LuminaStudio.Domain.Entities.Chat;
using LuminaStudio.Domain.Entities.ContactMessage;
using LuminaStudio.Domain.Entities.FaqItem;
using LuminaStudio.Domain.Entities.Photographer;
using LuminaStudio.Domain.Entities.PortfolioImage;
using LuminaStudio.Domain.Entities.ServicePackage;
using LuminaStudio.Domain.Entities.Testimonial;
using LuminaStudio.Domain.Entities.User;
using Microsoft.EntityFrameworkCore;

namespace LuminaStudio.DataAccessLayer.Context
{
    public class AppDbContext : DbContext
    {
        public DbSet<UserData> Users { get; set; }
        public DbSet<PhotographerData> Photographers { get; set; }
        public DbSet<PhotographerAvailabilityData> PhotographerAvailability { get; set; }
        public DbSet<ServicePackageData> ServicePackages { get; set; }
        public DbSet<ServicePackageFeatureData> ServicePackageFeatures { get; set; }
        public DbSet<BookingData> Bookings { get; set; }
        public DbSet<PortfolioImageData> PortfolioImages { get; set; }
        public DbSet<TestimonialData> Testimonials { get; set; }
        public DbSet<FaqItemData> FaqItems { get; set; }
        public DbSet<ChatConversationData> ChatConversations { get; set; }
        public DbSet<ChatMessageData> ChatMessages { get; set; }
        public DbSet<ContactMessageData> ContactMessages { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(DbSession.ConnectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PhotographerData>()
                .HasIndex(p => p.Slug)
                .IsUnique();

            modelBuilder.Entity<ServicePackageData>()
                .HasIndex(sp => sp.Slug)
                .IsUnique();

            modelBuilder.Entity<BookingData>()
                .HasOne(b => b.User)
                .WithMany(u => u.Bookings)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<BookingData>()
                .HasOne(b => b.Photographer)
                .WithMany(p => p.Bookings)
                .HasForeignKey(b => b.PhotographerId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<BookingData>()
                .HasOne(b => b.Package)
                .WithMany(sp => sp.Bookings)
                .HasForeignKey(b => b.PackageId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PhotographerAvailabilityData>()
                .HasOne(a => a.Photographer)
                .WithMany(p => p.Availability)
                .HasForeignKey(a => a.PhotographerId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PhotographerAvailabilityData>()
                .HasOne(a => a.Booking)
                .WithMany()
                .HasForeignKey(a => a.BookingId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<ServicePackageFeatureData>()
                .HasOne(f => f.Package)
                .WithMany(sp => sp.Features)
                .HasForeignKey(f => f.PackageId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PortfolioImageData>()
                .HasOne(pi => pi.Photographer)
                .WithMany(p => p.PortfolioImages)
                .HasForeignKey(pi => pi.PhotographerId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<ChatConversationData>()
                .HasOne(c => c.User)
                .WithMany(u => u.Conversations)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<ChatMessageData>()
                .HasOne(m => m.Conversation)
                .WithMany(c => c.Messages)
                .HasForeignKey(m => m.ConversationId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ContactMessageData>()
                .HasOne(cm => cm.User)
                .WithMany(u => u.ContactMessages)
                .HasForeignKey(cm => cm.UserId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<ChatConversationData>()
                .HasIndex(c => c.ClientEmail);

            modelBuilder.Entity<BookingData>()
                .HasIndex(b => b.Date);
        }
    }
}
